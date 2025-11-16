"use client";

import { Bot, User } from "lucide-react";

export default function ChatInterface({ message }) {
  const isUser = message?.role === "user";

  return (
    <div className="w-full mb-5 sm:mb-6">
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
          } max-w-[90%] sm:max-w-[68%] px-3 py-2 sm:px-4 sm:py-2.5 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.18)] wrap-break-word`}
        >
          <div className="text-[11px] sm:text-xs font-medium whitespace-pre-wrap leading-relaxed">
            {message?.content == null ? (
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce animation-delay-200" />
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce animation-delay-400" />
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
        <div className="mt-2 sm:mt-3 ml-9 sm:ml-11 text-[10px] sm:text-[11px]">
          <div className="font-semibold uppercase tracking-tight text-slate-300 mb-1 sm:mb-2">
            Sources:
          </div>
          <ul className="space-y-1 sm:space-y-1.5">
            {message.sources.map((s, i) => (
              <li
                key={i}
                className="bg-neutral-800 border-2 border-neutral-700 px-3 py-2 sm:py-2.5 font-medium text-slate-200 overflow-hidden"
              >
                {s.source ? (
                  <span className="font-semibold text-white uppercase">
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
