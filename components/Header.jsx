import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header({ redirectTo }) {
  return (
    <header className="border-b-4 border-white px-10 bg-neutral-800">
      <div className="flex justify-between mx-auto px-6 py-6">
        <div className="text-3xl font-black tracking-tighter uppercase">
          MindIndex
        </div>

        <div className="flex gap-10">
          <Link
            href={`/${redirectTo}`}
            className="px-6 py-2 bg-white text-neutral-900 font-bold uppercase tracking-tight border-4 border-white hover:bg-neutral-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            {redirectTo}
          </Link>
          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
