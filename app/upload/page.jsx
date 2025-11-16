"use client";

import { redirect } from "next/navigation";
import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(false);
  const [namespace, setNameSpace] = useState("");

  const { isLoaded, isSignedIn } = useUser();
  const fileInputRef = useRef(null);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    redirect("/");
  }

  async function uploadFile() {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("namespace", namespace.trim() || "default");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.message);
    setSuccess(data.success);

    if (data.success && data.namespace){
        localStorage.setItem("current_namespace", data.namespace)
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header redirectTo={"chat"} />

      <div className="container mx-auto px-3 sm:px-5 py-8 sm:py-16">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 tracking-tight leading-snug">
            Upload Document
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-300 mb-6 sm:mb-8">
            Drop a file or choose one to upload
          </p>

          <div className="border-4 border-white bg-neutral-800 p-5 sm:p-7 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-tight text-slate-300" htmlFor="namespace">
                  Project / Namespace
                </label>
                <input
                  id="namespace"
                  type="text"
                  placeholder="e.g. marketing-q1, product-docs"
                  value={namespace}
                  onChange={(e) => setNameSpace(e.target.value)}
                  className="px-3 py-2 bg-neutral-700 border-2 border-neutral-600 text-white font-medium placeholder:text-slate-400 focus:outline-none focus:border-white text-sm"
                />
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  This groups your documents; choose a consistent name.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="flex-1 text-xs sm:text-sm font-semibold text-white file:px-3 sm:file:px-4 file:mr-2 sm:file:mr-4 file:py-2 file:bg-white file:text-neutral-900 file:font-extrabold file:uppercase file:tracking-tight file:border-4 file:border-white file:cursor-pointer file:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:file:translate-x-0.5 hover:file:translate-y-0.5 hover:file:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] file:transition-all"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                <button
                  className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-neutral-900 text-sm sm:text-base font-extrabold uppercase tracking-tight border-4 border-white hover:translate-x-[3px] hover:translate-y-[3px] transition-transform shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={uploadFile}
                  disabled={!file || loading || !namespace.trim()}
                >
                  {loading ? "Uploading..." : "Upload to " + (namespace.trim() || "default")}
                </button>
              </div>
            </div>

            {file && (
              <div className="mt-5 border-4 border-white bg-neutral-700 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm uppercase break-all tracking-tight">
                      {file.name}
                    </div>
                    <div className="text-[11px] font-medium text-slate-300">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 bg-red-500 text-white font-semibold uppercase tracking-tight border-4 border-white hover:bg-red-600 transition-colors text-xs sm:text-sm"
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-5 border-4 border-white bg-neutral-700 p-3 sm:p-4">
                <p className="font-medium text-white whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
                  {result}
                </p>
              </div>
            )}
            {success && (
              <div className="mt-5">
                <button
                  className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-green-400 text-neutral-900 text-sm sm:text-base font-extrabold uppercase tracking-tight border-4 border-white hover:translate-x-[3px] hover:translate-y-[3px] transition-transform shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                  onClick={() => redirect("/chat")}
                >
                  Start Chat 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
