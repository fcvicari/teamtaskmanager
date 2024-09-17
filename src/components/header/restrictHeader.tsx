import Image from "next/image";
import { ModeToggle } from "../toggle/setTheme";

import logoDark from "../../../public/logoDark.png";
import logoLight from "../../../public/logoLight.png";
import { ButtonLogOut } from "../button/buttonLogOut";

export function RestrictHeader() {
  return (
    <header className="w-full bg-background">
      <div className="flex justify-between items-center py-2 px-3 md:px-10 lg:px-20 w-full border-b-2 border-[hsl(var(--sessionBorder))]">
        <Image alt="Team Tash Manager" src={logoLight} width={100} height={100} className="inline dark:hidden" />
        <Image alt="Team Tash Manager" src={logoDark} width={100} height={100} className="hidden dark:inline" />
        <div className="flex gap-1 justify-center content-center items-end md:items-center">
          <ModeToggle />
          <ButtonLogOut />
        </div>
      </div>
    </header>
  )

}