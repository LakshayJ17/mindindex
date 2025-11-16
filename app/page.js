'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Database, RefreshCcw, Search, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-white bg-neutral-800/95 backdrop-blur px-4 sm:px-6">
        <div className="mx-auto max-w-7xl py-4 sm:py-5 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase select-none">
            MindIndex
          </h1>
          <nav className="flex items-center gap-3 sm:gap-4">
            <SignedOut>
              <div className="flex gap-3 sm:gap-4">
                <SignInButton mode="modal">
                  <button className="px-5 sm:px-6 py-2 bg-white text-neutral-900 font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform text-xs sm:text-sm">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-5 sm:px-6 py-2 bg-neutral-900 text-white font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform text-xs sm:text-sm">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href="/upload"
                  className="px-5 sm:px-6 py-2 bg-white text-neutral-900 font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform text-xs sm:text-sm"
                >
                  Upload
                </Link>
                <Link
                  href="/chat"
                  className="px-5 sm:px-6 py-2 bg-neutral-900 text-white font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform text-xs sm:text-sm"
                >
                  Chat
                </Link>
              </div>
            </SignedIn>
          </nav>
        </div>
      </header>


      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-28 sm:pt-32 min-h-screen flex items-center">
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase leading-[1.05] tracking-tight mb-6 sm:mb-8">
            Find Every<br />
            <span className="text-slate-400">Document.</span><br />
            Instantly.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl font-medium text-slate-300 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
            Your team generates massive amounts of documents - finding the right file shouldn&apos;t be this hard.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-7 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 text-sm sm:text-base font-extrabold uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2 whitespace-nowrap">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/upload"
                className="px-7 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 text-sm sm:text-base font-extrabold uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2 whitespace-nowrap"
              >
                <span>Upload Files</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </Link>
            </SignedIn>
            <button className="px-7 sm:px-8 py-3 sm:py-4 bg-neutral-900 text-white text-sm sm:text-base font-extrabold uppercase tracking-tight border-4 border-white hover:bg-white hover:text-neutral-900 transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              Watch Demo
            </button>
          </div>
        </div>
      </section>


      <section className="bg-neutral-800 border-y-4 border-white py-12 px-10">
        <div className="w-full">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <div className="border-4 border-white p-6 sm:p-8 bg-red-500 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase mb-3 sm:mb-4 text-neutral-900 tracking-tight">The Problem</h3>
              <p className="text-sm sm:text-lg font-medium text-neutral-900 leading-relaxed">
                Content becomes scattered. Time gets wasted. Messaging becomes inconsistent. Your team can&apos;t find what they need when they need it.
              </p>
            </div>
            <div className="border-4 border-white p-6 sm:p-8 bg-green-400 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase mb-3 sm:mb-4 text-neutral-900 tracking-tight">The Solution</h3>
              <p className="text-sm sm:text-lg font-medium text-neutral-900 leading-relaxed">
                MindIndex indexes all your documents, delivers lightning-fast search results, and helps your team find information instantly.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase mb-10 sm:mb-16 tracking-tight">Features</h2>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            { title: 'Smart Indexing', desc: 'Automatically processes PDFs, DOCX, PPTX, and more', icon: <Database size={36} /> },
            { title: 'Lightning Search', desc: 'Find any document in milliseconds with AI-powered search', icon: <Search size={36} /> },
            { title: 'Team Sync', desc: 'Everyone has access to the same source of truth', icon: <RefreshCcw size={36} /> },
          ].map((feature, i) => (
            <div
              key={i}
              className="border-4 border-white p-6 sm:p-8 bg-neutral-800 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase mb-2 sm:mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="bg-white text-neutral-900 border-t-4 border-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase mb-6 sm:mb-8 tracking-tight">
            Stop Searching.<br />Start Finding.
          </h2>
          <p className="text-sm sm:text-lg font-medium mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join teams that have transformed their document workflow with MindIndex.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-8 sm:px-12 py-4 sm:py-6 bg-neutral-900 text-white text-base sm:text-2xl font-extrabold uppercase tracking-tight border-4 border-neutral-900 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[10px_10px_0px_0px_rgba(23,23,23,1)] hover:shadow-[5px_5px_0px_0px_rgba(23,23,23,1)] inline-flex items-center gap-3 whitespace-nowrap">
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/upload"
              className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-6 bg-neutral-900 text-white text-base sm:text-2xl font-extrabold uppercase tracking-tight border-4 border-neutral-900 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[10px_10px_0px_0px_rgba(23,23,23,1)] hover:shadow-[5px_5px_0px_0px_rgba(23,23,23,1)] whitespace-nowrap"
            >
              <span>Upload Your First Doc</span>
              <ArrowRight className="w-6 h-6" aria-hidden="true" />
            </Link>
          </SignedIn>
        </div>
      </section>


      <footer className="border-t-4 border-white bg-neutral-800 py-8 sm:py-12 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-lg font-extrabold uppercase tracking-tight text-slate-300">
            © 2025 MindIndex. Built for teams that move fast.
          </p>
        </div>
      </footer>
    </div>
  );
}
