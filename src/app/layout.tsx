import type { Metadata } from "next";
import { Comfortaa } from 'next/font/google';
import "./globals.css";

const comfortaa = Comfortaa({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Team Task Manager",
  description: "Application for managing and controlling development team tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
