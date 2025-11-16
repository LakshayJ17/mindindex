import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header({ redirectTo }) {
  return (
    <header className="border-b-4 border-white bg-neutral-800/95 backdrop-blur px-4 sm:px-8">
      <div className="flex justify-between items-center mx-auto max-w-6xl py-4 sm:py-5">
        <div className="text-2xl sm:text-2xl font-extrabold tracking-tight uppercase select-none">
          MindIndex
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href={`/${redirectTo}`}
            className="px-4 sm:px-5 py-2 bg-white text-neutral-900 font-extrabold uppercase tracking-tight border-4 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform text-xs sm:text-sm"
          >
            {redirectTo}
          </Link>
          <SignedIn>
            <div className="flex items-center">
              <UserButton appearance={{ elements: { userButtonAvatarBox: 'border-2 border-white' } }} />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
