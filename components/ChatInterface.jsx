"use client";

import { Bot, User } from "lucide-react";

export default function ChatInterface({ message }) {
  const isUser = message?.role === "user";

  return (
    <div className="w-full mb-6">
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } gap-3 items-start`}
      >
        {!isUser && (
          <div className="bg-white border-4 border-white flex items-center justify-center text-neutral-900 p-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            <Bot size={20} strokeWidth={3} />
          </div>
        )}

        <div
          className={`${
            isUser
              ? "bg-white text-neutral-900 border-4 border-white"
              : "bg-neutral-800 text-white border-4 border-neutral-700"
          } max-w-[75%] p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}
        >
          <div className="text-sm font-bold whitespace-pre-wrap">
            {message?.content == null ? (
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-neutral-900 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-neutral-900 rounded-full animate-bounce animation-delay-200" />
                <span className="w-2 h-2 bg-neutral-900 rounded-full animate-bounce animation-delay-400" />
              </div>
            ) : (
              message.content
            )}
          </div>
        </div>

        {isUser && (
          <div className="bg-white border-4 border-white flex items-center justify-center text-neutral-900 p-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            <User size={20} strokeWidth={3} />
          </div>
        )}
      </div>
      {message?.sources && message.sources.length > 0 && (
        <div className="mt-3 ml-12 text-xs">
          <div className="font-black uppercase tracking-tight text-slate-300 mb-2">
            Sources:
          </div>
          <ul className="space-y-2">
            {message.sources.map((s, i) => (
              <li
                key={i}
                className="bg-neutral-800 border-2 border-neutral-700 p-3 font-bold text-slate-200"
              >
                {s.source ? (
                  <span className="font-black text-white uppercase">
                    {s.source}:{" "}
                  </span>
                ) : null}
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
