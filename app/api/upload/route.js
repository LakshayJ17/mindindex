export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { loadDocumentByExtension } from "@/utils/load-doc";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ 
                success: false, 
                message: "Please sign in to upload files" 
            }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file");
        let namespace = formData.get("namespace") || "default";

        if (!file) {
            return NextResponse.json(
                { success: false, message: "Please select a file to upload" },
                { status: 400 }
            );
        }

        // SAVE FILE TEMP
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadsDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

        const filePath = path.join(uploadsDir, `${Date.now()}-${file.name}`);
        fs.writeFileSync(filePath, buffer);

        // DETECT EXT
        const ext = path.extname(file.name).toLowerCase();

        // LOAD & EXTRACT
        const docs = await loadDocumentByExtension(filePath, ext);

        if (!docs || docs.length === 0) {
            fs.unlinkSync(filePath);
            return NextResponse.json(
                { success: false, message: "Unable to extract text from this file. Please try a different document." },
                { status: 400 }
            );
        }

        // console.log("DOCS :", docs);

        // ADD METADATA 
        const fileBase = file.name.replace(/\.[^/.]+$/, "");

        const docsWithMeta = docs.map(doc => {
            return new Document({
                pageContent: doc.pageContent,
                metadata: {
                    ...doc.metadata,
                    filename: fileBase,
                }
            });
        });

        // console.log("Meta data docs : ", docsWithMeta);


        // CHUNKING
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const splitDocs = await splitter.splitDocuments(docsWithMeta);

        // console.log("SPLIT DOCS : ", splitDocs);

        // EMBEDDINGS SETUP
        const embeddings = new OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY,
            model: "text-embedding-3-small",
        });

        // PINECONE INIT
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });

        const indexName = process.env.PINECONE_INDEX_NAME;
        if (!indexName) throw new Error("Missing PINECONE_INDEX_NAME");

        // ENSURE INDEX EXISTS
        const allIndexes = await pc.listIndexes();
        const exists = allIndexes.indexes?.some(i => i.name === indexName);

        if (!exists) {
            await pc.createIndex({
                name: indexName,
                dimension: 1536,
                metric: "cosine",
                spec: {
                    serverless: { cloud: "aws", region: "us-east-1" },
                },
            });
            // console.log("Created Pinecone index:", indexName);
        }

        const pineconeIndex = pc.Index(indexName);

        // STORE IN PINECONE
        await PineconeStore.fromDocuments(splitDocs, embeddings, {
            pineconeIndex,
            namespace,
        });

        // DELETE TEMP FILE
        fs.unlinkSync(filePath);

        const res = NextResponse.json({
            success: true,
            message: `Document uploaded successfully! Ready to chat.`,
            namespace,
            filename: fileBase,
        });
        // Persist namespace via cookie only (no Clerk metadata)
        res.cookies.set("mindindex_ns", namespace, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;

    } catch (err) {
        console.error("UPLOAD ERROR:", err);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while processing your file. Please try again.",
                error: err.message,
            },
            { status: 500 }
        );
    }
}
