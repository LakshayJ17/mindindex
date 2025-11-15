import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text"
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export async function loadDocumentByExtension(filePath, ext) {
    switch (ext) {
        case ".pdf":
            return new PDFLoader(filePath).load()

        case ".docx":
            return new DocxLoader(filePath).load()

        case ".pptx":
            return new PPTXLoader(filePath).load()

        case ".txt":
        case ".mdx":
            return new TextLoader(filePath).load()

        case ".html":
        case ".htm":
            return new CheerioWebBaseLoader(filePath).load();

        default:
            throw new Error(`Unsupported file type ${txt}`)
    }
}