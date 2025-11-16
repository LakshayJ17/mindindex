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
  const [namespace, setNamespace] = useState("default");
  const messagesEndRef = useRef(null);

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    try {
      const cookieNs = document.cookie
        .split("; ")
        .find((c) => c.startsWith("mindindex_ns="))
        ?.split("=")[1];
      if (cookieNs) setNamespace(cookieNs);
    } catch (e) {
      console.log("error fetching cookie : ", e);
    }
  }, []);

  // Load existing chat history
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/chat", { method: "GET" });
        if (!res.ok) return;

        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          setMessages(
            data.messages.map((m) => ({ role: m.role, content: m.content }))
          );
        }
      } catch (err) {
        console.log("Failed to load history", err);
      }
    }
    if (isLoaded && isSignedIn) loadHistory();
  }, [isLoaded, isSignedIn]);

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
        body: JSON.stringify({ query, namespace }),
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
      <div className="flex-1 container mx-auto px-3 sm:px-5 py-6 sm:py-8 flex flex-col max-w-3xl">
        <div className="flex-1 overflow-y-auto mb-5 space-y-3">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase mb-3 text-slate-300 tracking-tight">
                  Start Chatting
                </h2>
                <p className="text-sm sm:text-base font-medium text-slate-400 leading-relaxed">
                  Ask anything about your uploaded documents
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => <ChatInterface key={i} message={msg} />)
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-auto sticky bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur border-t-4 border-white pt-3 pb-3 sm:pb-5"
        >
          <div className="flex gap-2 sm:gap-3 w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-3 bg-neutral-700 border-2 border-neutral-600 text-white font-medium placeholder:text-slate-400 focus:outline-none focus:border-white text-xs sm:text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="px-4 sm:px-5 py-3 bg-white text-neutral-900 font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 transition-transform text-xs sm:text-sm"
            >
              {loading ? "..." : <Send size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
