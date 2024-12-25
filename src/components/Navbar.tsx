import { checkAccess } from "@/utils/roles";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="Hogwarts Logo"
          className="h-10 cursor-pointer"
        />
      </Link>
      <ul className="flex space-x-6">
        {[
          { href: "/", label: "HOME" },
          { href: "/about", label: "ABOUT" },
          { href: "/houses", label: "HOUSES" },
          { href: "/blog", label: "BLOG" },
          { href: "/contact", label: "CONTACT" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-yellow-500 transition duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {(await checkAccess("admin")) && (
          <li>
            <Link
              href="/admin"
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              ADMIN
            </Link>
          </li>
        )}
      </ul>
      <div className="flex items-center">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <div className="relative w-10 h-10">
            <ClerkLoading>
              <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full animate-pulse" />
            </ClerkLoading>
            <ClerkLoaded>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <UserButton />
              </div>
            </ClerkLoaded>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
