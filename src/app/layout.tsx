import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ECHO VOID – Acoustic Rescue Dashboard",
  description: "Real‑time acoustic rescue sensor array dashboard and admin panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark`}>
      <body className="min-h-full flex flex-col bg-gray-900 text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
