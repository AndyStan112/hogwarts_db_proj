import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
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
      </ul>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
