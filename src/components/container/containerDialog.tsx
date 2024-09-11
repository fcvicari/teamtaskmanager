import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function ContainerDialog({ children }: ContainerProps) {
  return (
    <div className="flex flex-col gap-4 bg-primary-foreground text-black border-[1px] shadow-md rounded-lg p-4 min-w-96 my-3 max-w-5xl">
      { children }
    </div>
  )
}