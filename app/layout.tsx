import type { Metadata } from "next";
import "./globals.css";
import { googelSans } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Noir",
  description: "idk what should i say here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googelSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
