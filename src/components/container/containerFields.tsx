import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function ContainerFields({ children }: ContainerProps) {
  return (
    <div className="flex flex-col space-y-1 py-2">
      { children }
    </div>
  )
}