'use client'

import { LogOut, MoonIcon, SunIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./dropdown-menu"

export function UserMenu() {
  const { data: session } = useSession()
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  return (
    <div className="flex gap-1 justify-center content-center items-end md:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-12 w-12 md:h-14 md:w-14'>
            <AvatarImage src={session?.user.avatar ? session.user.avatar : '/avatar.png'} />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 mr-3">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/restrict/profile')}>
              My profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              Switch theme
              <DropdownMenuShortcut className="flex">
                <SunIcon className="text-primary h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
   </div>
  )
}