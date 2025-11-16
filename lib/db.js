import mongoose from "mongoose";

let isConnected = false; 

export async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");
  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined,
    });
    isConnected = true;
  } catch (err) {
    console.error("Mongo connection error", err);
    throw err;
  }
}
