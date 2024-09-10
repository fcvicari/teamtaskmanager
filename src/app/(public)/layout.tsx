import { PublicFooter } from "@/components/footer/publicFooter";
import { PublicHeader } from "@/components/header/publicHeader";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <PublicHeader />

      <main className="flex w-full px-3 md:px-10 lg:px-20 border-[hsl(var(--sessionBorder))]">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
