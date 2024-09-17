import { ReactNode } from "react";
import { AlertError } from "../alert/error";

interface ContainerProps {
  children: ReactNode;
  error?: string;
}

export function ContainerDialog({ children, error }: ContainerProps) {
  return (
    <div className="flex flex-col gap-4 bg-primary-foreground text-black border-[1px] shadow-md rounded-lg px-4 md:px-6 py-2 min-w-96 my-3 max-w-5xl">
      { children }
      <AlertError message={ error } />
    </div>
  )
}