"use client"

import { actionChangeProfile } from '@/actions/changeProfile'
import { Avatar, AvatarImage } from '@/components/avatar/avatar'
import { Button } from '@/components/button/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/form/form'
import { Input } from '@/components/input/input'
import { changeProfileFormDate, changeProfileSchema } from '@/schema/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'

interface AccountProps{
  onClose: () => void;
}

export default function Account({ onClose }: AccountProps) {
  const { isPending, execute } = useServerAction(actionChangeProfile) 
  const { data: session } = useSession()

  const methods = useForm<changeProfileFormDate>({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
    }
  })

  async function submitSingUp(values: changeProfileFormDate) {
    console.log(values)

    await execute(values)

    onClose
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize >= 2) {
        alert('The maximum image size is 2Mb.')
        return
      }

    }
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(submitSingUp)} className='mt-4'>
        <div className='flex w-full items-center justify-center pb-4'>
          <div className='relative'>
            <Avatar className='h-28 md:h-32 w-28 md:w-32'>
              <AvatarImage className='fit' src={session?.user.avatar ? session.user.avatar : '/avatar.png'} />
            </Avatar>
            <label className="absolute cursor-pointer flex justify-center items-center bottom-0 right-0 w-10 h-10 rounded-full bg-accent">
              <input
                type="file"
                id="avatar"
                onChange={handleImageChange}
                className="object-none hidden"
              />

              <Camera className='size-5' />
            </label>
          </div>
        </div>

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

        <div className='flex w-full gap-4'>
          <Button type="submit" size="full" isSubmitting={isPending} disabled={isPending}>Save</Button>
          <Button onClick={onClose} size="full" isSubmitting={isPending} disabled={isPending} variant="secondary">Close</Button>
        </div>
      </form>
    </Form>
  )
}
