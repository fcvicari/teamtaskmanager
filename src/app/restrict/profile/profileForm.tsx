'use client'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button/index'
import { Input } from '@/components/input/index'
import { FileToBase64 } from '@/lib/file.base64'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiCamera, FiCameraOff, FiMail } from 'react-icons/fi'
import z from 'zod'

const profileFormSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, 'Enter your name'),
    email: z.string().email('Provide a valid e-mail').toLowerCase(),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
    checkPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['checkPassword'],
        message: 'Passwords must be the same',
      })
    }
  })

type profileFormDate = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const [imagem, setImage] = useState<string | null>(null)

  const methods = useForm<profileFormDate>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
    },
  })

  useEffect(() => {
    async function getProfile() {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (response.status === 200 || response.status === 201) {
        const { id, name, email, avatar } = await response.json()
        methods.clearErrors()
        methods.setValue('id', id)
        methods.setValue('name', name)
        methods.setValue('email', email)
        setImage(avatar)
      }
    }

    getProfile()
  }, [methods])

  async function submitSingUp({ id, name, email, password }: profileFormDate) {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        id,
        name,
        email,
        password,
        avatar: imagem,
      }),
    })
    if (response.status === 200 || response.status === 201) {
      await signOut({
        redirect: true,
        callbackUrl: '/',
      })
    }
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize >= 2) {
        alert('The maximum image size is 2Mb.')
        return
      }

      const imageBase64 = String(await FileToBase64(file as File))

      setImage(imageBase64)
    }
  }

  async function handleClearImage() {
    setImage(null)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitSingUp)}
        className="flex flex-col w-full max-w-80"
      >
        <div className="flex items-center justify-center w-full center mb-3">
          <div className="relative">
            <Avatar image={imagem} variant="large" />
            {imagem ? (
              <div className="absolute cursor-pointer flex justify-center items-center bottom-0 right-0 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-300 dark:text-black">
                <FiCameraOff onClick={() => handleClearImage()} />
              </div>
            ) : (
              <label className="absolute cursor-pointer flex justify-center items-center bottom-0 right-0 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-300 dark:text-black">
                <input
                  type="file"
                  id="avatar"
                  onChange={handleImageChange}
                  className="object-none hidden"
                />

                <FiCamera />
              </label>
            )}
          </div>
        </div>

        <Input.Root
          htmlFor="name"
          size="full"
          error={methods.formState.errors.name?.message}
        >
          <Input.Input name="name" placeholder="Name" />
        </Input.Root>

        <Input.Root
          htmlFor="email"
          size="full"
          error={methods.formState.errors.email?.message}
        >
          <Input.Input name="email" placeholder="E-mail" />
          <Input.Icon icon={FiMail} />
        </Input.Root>

        <Input.Root
          htmlFor="password"
          size="full"
          error={methods.formState.errors.password?.message}
        >
          <Input.Password
            name="password"
            autoComplete="false"
            placeholder="Password"
          />
        </Input.Root>

        <Input.Root
          htmlFor="checkPassword"
          size="full"
          error={methods.formState.errors.checkPassword?.message}
        >
          <Input.Password
            name="checkPassword"
            autoComplete="false"
            placeholder="Confirm your password"
          />
        </Input.Root>

        <Button.Root size="full" variant="primary">
          <Button.Text label="Submit" />
        </Button.Root>
      </form>
    </FormProvider>
  )
}
