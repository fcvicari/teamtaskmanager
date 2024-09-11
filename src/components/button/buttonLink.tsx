"use client"
 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ButtonLinkProps {
  label: string;
  url: string;
  variant?: "default" | "link"
}

export function ButtonLink({ label, url, variant = "default" }: ButtonLinkProps) {
  const router = useRouter()

  return (
    <Button variant={variant} size="default" onClick={() => router.push(url)}>
      { label }
    </Button>
  )
}