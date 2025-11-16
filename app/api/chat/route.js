import { auth } from "@clerk/nextjs/server";
import { Pinecone } from "@pinecone-database/pinecone"
import { NextResponse } from "next/server"
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import OpenAI from "openai";


export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { query, namespace } = await req.json()
        if (!query || query.trim().length === 0) {
            return NextResponse.json({
                success: false,
                message: "Missing user input"
            }, { status: 400 })
        }

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

        const embeddings = new OpenAIEmbeddings({
            model: 'text-embedding-3-small',
            apiKey: process.env.OPENAI_API_KEY
        })

        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY
        })

        const indexName = process.env.PINECONE_INDEX_NAME;
        const pineconeIndex = pc.Index(indexName);

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            namespace
        })

        const results = await vectorStore.similaritySearch(query, 5)
        if (!results || results.length === 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: "No relevant context found in the document",
                    sources: []
                }
            )
        }

        const context = results.map(
            (r, i) => `Chunk ${i + 1} (filename : ${r.metadata.filename})\n${r.pageContent}`
        ).join("\n\n --- \n\n")


        const systemPrompt = `You are a helpful assistant. Use the provided context to answer the user's question accurately.
            If the answer is not present in the context, say "I don't have enough information to answer that."
    
            Context:
            ${context}
        `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": query }
            ]
        })

        const answer = completion.choices[0].message.content

        return NextResponse.json(
            {
                success: true,
                message: answer,
                sources: results.map(
                    r => ({
                        text: (r.pageContent || "").slice(0, 200) + "...",
                        metadata: r.metadata
                    })
                )
            }
        )
    } catch (error) {
        console.log("Error : ", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            { status: 500 }
        )
    }

}