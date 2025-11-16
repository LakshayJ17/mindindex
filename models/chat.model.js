import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
        trim: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true
    },
}, { _id: false })


const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
}, { timestamps: true })

export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)