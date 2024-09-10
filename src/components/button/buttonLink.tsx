"use client"
 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ButtonLinkProps {
  label: string;
  url: string;
}

export function ButtonLink({ label, url }: ButtonLinkProps) {
  const router = useRouter()

  return (
    <Button variant="default" size="default" onClick={() => router.push(url)}>
      { label }
    </Button>
  )
}