import { Label } from "@/components/label/label";
import Image from "next/image";
import { ModeToggle } from "../toggle/setTheme";


import logoDark from "../../../public/logoDark.png";
import logoLight from "../../../public/logoLight.png";
import { ButtonLink } from "../button/buttonLink";

export function PublicHeader() {
  return (
    <header className="w-full bg-background">
      <div className="flex justify-between items-center py-2 px-3 md:px-10 lg:px-20 w-full border-b-2 border-[hsl(var(--sessionBorder))]">
        <Image alt="Team Tash Manager" src={logoLight} width={100} height={100} className="inline dark:hidden" />
        <Image alt="Team Tash Manager" src={logoDark} width={100} height={100} className="hidden dark:inline" />
        <div className="flex gap-4 justify-center content-center items-end md:items-center">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Label>Don&lsquo;t have an account?</Label>
            <ButtonLink url="/singUp" label="Create an account" />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )

}