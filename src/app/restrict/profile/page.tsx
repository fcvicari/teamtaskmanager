"use client"

import { actionChangeProfile } from '@/actions/changeProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar/avatar'
import { Button } from '@/components/button/button'
import { ContainerDialog } from '@/components/container/containerDialog'
import { ContainerFields } from '@/components/container/containerFields'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/form/form'
import { Input } from '@/components/input/input'
import { Title } from '@/components/title'
import { changeProfileFormDate, changeProfileSchema } from '@/schema/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, CameraOff } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'

export default function Profile() {
  const { isPending, execute, error } = useServerAction(actionChangeProfile) 
  const { data: session } = useSession()

  const methods = useForm<changeProfileFormDate>({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
    }
  })

  async function submitSingUp(values: changeProfileFormDate) {
    await execute(values)
  }

  return (
    <div className="flex flex-col justify-center items-center content-center w-full min-h-[80dvh]">
      <Form {...methods}>
        <ContainerDialog error={error?.message}>
          <Title size="h1">My profile</Title>

          <form onSubmit={methods.handleSubmit(submitSingUp)}>
            <div className='flex w-full items-center justify-center pb-4'>
              <div className='relative'>
                <Avatar className='h-28 md:h-32 w-28 md:w-32'>
                  <AvatarImage className='fit' src={session?.user.avatar ? session.user.avatar : '/avatar.png'} />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <div className="absolute cursor-pointer flex justify-center items-center bottom-0 right-0 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-200 dark:text-black">
                  <CameraOff className='size-5' />
                  <Camera className='size-5' />
                </div>
              </div>
            </div>

            <ContainerFields>

              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        htmlFor="name"
                        id="name"
                        required
                        placeholder="Name"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        htmlFor="email"
                        id="email"
                        required
                        placeholder="E-mail"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </ContainerFields>
            <Button type="submit" size="full" isSubmitting={isPending} disabled={isPending}>Save</Button>
          </form>
        </ContainerDialog>

      </Form>
    </div>
  )
}
