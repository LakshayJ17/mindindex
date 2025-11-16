'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Database, RefreshCcw, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b-4 border-white bg-neutral-800">
        <div className="container mx-auto p-6 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            MindIndex
          </h1>
          <nav className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-white text-neutral-900 font-bold uppercase tracking-tight border-4 border-white hover:bg-neutral-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-neutral-900 text-white font-bold uppercase tracking-tight border-4 border-white hover:bg-white hover:text-neutral-900 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/upload"
                className="px-6 py-2 bg-white text-neutral-900 font-bold uppercase tracking-tight border-4 border-white hover:bg-neutral-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Upload
              </Link>
              <Link
                href="/chat"
                className="px-6 py-2 bg-neutral-900 text-white font-bold uppercase tracking-tight border-4 border-white hover:bg-white hover:text-neutral-900 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Chat
              </Link>
            </SignedIn>
          </nav>
        </div>
      </header>


      <section className="container mx-auto px-6 py-15">
        <div className="max-w-5xl">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-8">
            Find Every
            <br />
            <span className="text-slate-400">Document.</span>
            <br />
            Instantly.
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-300 mb-10 max-w-3xl leading-tight">
            Your team generates massive amounts of documents - finding the right file shouldn&apos;t be this hard.
          </p>
          <div className="flex flex-wrap gap-6">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-10 py-5 bg-white text-neutral-900 text-xl font-black uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Get Started →
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/upload"
                className="px-10 py-5 bg-white text-neutral-900 text-xl font-black uppercase tracking-tight border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Upload Files →
              </Link>
            </SignedIn>
            <button className="px-10 py-5 bg-neutral-900 text-white text-xl font-black uppercase tracking-tight border-4 border-white hover:bg-white hover:text-neutral-900 transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              Watch Demo
            </button>
          </div>
        </div>
      </section>



      <section className="bg-neutral-800 border-y-4 border-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="border-4 border-white p-8 bg-red-500 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <h3 className="text-3xl font-black uppercase mb-4 text-neutral-900">The Problem</h3>
              <p className="text-lg font-bold text-neutral-900 leading-relaxed">
                Content becomes scattered. Time gets wasted. Messaging becomes inconsistent. Your team can&apos;t find what they need when they need it.
              </p>
            </div>
            <div className="border-4 border-white p-8 bg-green-400 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <h3 className="text-3xl font-black uppercase mb-4 text-neutral-900">The Solution</h3>
              <p className="text-lg font-bold text-neutral-900 leading-relaxed">
                MindIndex indexes all your documents, delivers lightning-fast search results, and helps your team find information instantly.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="container mx-auto px-6 py-20">
        <h2 className="text-5xl font-black uppercase mb-16 tracking-tighter">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Smart Indexing',
              desc: 'Automatically processes PDFs, DOCX, PPTX, and more',
              icon: <Database size={40} />,
            },
            {
              title: 'Lightning Search',
              desc: 'Find any document in milliseconds with AI-powered search',
              icon: <Search size={40} />,
            },
            {
              title: 'Team Sync',
              desc: 'Everyone has access to the same source of truth',
              icon: <RefreshCcw size={40} />
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="border-4 border-white p-8 bg-neutral-800 hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-3xl font-black uppercase mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-lg font-bold text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>



      <section className="bg-white text-neutral-900 border-t-4 border-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
            Stop Searching.
            <br />
            Start Finding.
          </h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
            Join teams that have transformed their document workflow with MindIndex.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-12 py-6 bg-neutral-900 text-white text-2xl font-black uppercase tracking-tight border-4 border-neutral-900 hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[12px_12px_0px_0px_rgba(23,23,23,1)] hover:shadow-[6px_6px_0px_0px_rgba(23,23,23,1)]">
                Start Free Trial →
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/upload"
              className="inline-block px-12 py-6 bg-neutral-900 text-white text-2xl font-black uppercase tracking-tight border-4 border-neutral-900 hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[12px_12px_0px_0px_rgba(23,23,23,1)] hover:shadow-[6px_6px_0px_0px_rgba(23,23,23,1)]"
            >
              Upload Your First Doc →
            </Link>
          </SignedIn>
        </div>
      </section>


      <footer className="border-t-4 border-white bg-neutral-800 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl font-black uppercase tracking-tight text-slate-300">
            © 2025 MindIndex. Built for teams that move fast.
          </p>
        </div>
      </footer>
    </div>
  );
}
