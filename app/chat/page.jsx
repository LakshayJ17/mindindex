"use client";

import { useRef, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ChatInterface from "@/components/ChatInterface";
import { Send } from "lucide-react";
import Header from "@/components/Header";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    redirect("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: null }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.message || "No response",
          sources:
            data.sources?.map((s) => ({
              text: s.text,
              source: s.metadata?.filename,
            })) || [],
        };
        return updated;
      });
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <Header redirectTo={"upload"} />

      <div className="flex-1 container mx-auto px-6 py-8 flex flex-col max-w-4xl">
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-3xl font-black uppercase mb-4 text-slate-300">
                  Start Chatting
                </h2>
                <p className="text-lg font-bold text-slate-400">
                  Ask anything about your uploaded documents
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => <ChatInterface key={i} message={msg} />)
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 bg-neutral-700 border-2 border-neutral-600 text-white font-bold placeholder:text-slate-400 focus:outline-none focus:border-white"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="px-6 py-3 bg-white text-neutral-900 font-black uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "..." : <Send size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
