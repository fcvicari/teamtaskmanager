import Image from "next/image";

import logoDark from "../../../public/logoDark.png";
import logoLight from "../../../public/logoLight.png";
import { UserMenu } from "../menu/userMenu";

export function RestrictHeader() {
  return (
    <header className="w-full bg-background">
      <div className="flex justify-between items-center py-2 px-3 md:px-10 lg:px-20 w-full border-b-2 border-[hsl(var(--sessionBorder))]">
        <Image alt="Team Tash Manager" src={logoLight} width={100} height={100} className="inline dark:hidden" />
        <Image alt="Team Tash Manager" src={logoDark} width={100} height={100} className="hidden dark:inline" />
        <UserMenu />
      </div>
    </header>
  )

}