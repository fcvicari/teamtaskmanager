import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col gap-4 bg-primary-foreground text-black border-[1px] shadow-md rounded-lg p-4 w-full md:w-1/3">
      { children }
    </div>
  )
}