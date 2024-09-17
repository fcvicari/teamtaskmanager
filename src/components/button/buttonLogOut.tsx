"use client"
 
import { Button } from "@/components/button/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function ButtonLogOut() {

  return (
    <Button className="flex gap-2 items-center" variant="ghost" size="default" onClick={() => signOut()}>
      Sair
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}