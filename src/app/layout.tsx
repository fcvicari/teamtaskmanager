import { ThemeProvider } from "@/components/providers/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${comfortaa.className} antialiased text-[hsl(var(--text01))] bg-[url('/backgroundLight.png')] dark:bg-[url('/backgroundDark.png')] bg-no-repeat bg-bottom 2xl:bg-[length:100%_28rem]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
