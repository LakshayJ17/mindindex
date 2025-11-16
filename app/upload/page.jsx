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

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.message);
    setSuccess(data.success);
    setLoading(false);
  }

  return (
    <div className="h-screen bg-neutral-900 text-white">
      <Header redirectTo={"chat"} />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">
            Upload Document
          </h2>
          <p className="text-lg font-bold text-slate-300 mb-12">
            Drop a file or choose one to upload
          </p>

          <div className="border-4 border-white bg-neutral-800 p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex flex-col gap-6">
              <input
                type="file"
                ref={fileInputRef}
                className="w-full text-base font-bold text-white file:px-6 file:mr-5 file:py-3 file:bg-white file:text-neutral-900 file:font-black file:uppercase file:tracking-tight file:border-4 file:border-white file:cursor-pointer file:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:file:translate-x-1 hover:file:translate-y-1 hover:file:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] file:transition-all"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <button
                className="w-full px-8 py-4 bg-white text-neutral-900 text-lg font-black uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={uploadFile}
                disabled={!file || loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {file && (
              <div className="mt-6 border-4 border-white bg-neutral-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-lg uppercase">
                      {file.name}
                    </div>
                    <div className="text-sm font-bold text-slate-300">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold uppercase tracking-tight border-4 border-white hover:bg-red-600 transition-colors"
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
              <div className="mt-6 border-4 border-white bg-neutral-700 p-4">
                <p className="font-bold text-white whitespace-pre-wrap">
                  {result}
                </p>
              </div>
            )}

            {success && (
              <div className="mt-6">
                <button
                  className="w-full px-8 py-4 bg-green-400 text-neutral-900 text-lg font-black uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                  onClick={() => redirect("/chat")}
                >
                  Start Chat →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
