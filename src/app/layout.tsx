import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Debate Tools",
  description:
    "Tools for conducting and preparing debates in English and Polish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
