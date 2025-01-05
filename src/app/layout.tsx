import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import the Footer
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Hogwarts School of Witchcraft and Wizardry",
  description: "Attend the most prestigious magical school",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
