'use client'

import { actionActivateUser } from "@/actions/activateUser";
import { Button } from "@/components/button/button";
import { ContainerDialog } from "@/components/container/containerDialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/form/form";
import { Input } from "@/components/input/input";
import { InputPassword } from "@/components/input/inputPassword";
import { Title } from "@/components/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AlterPassword from "./alterPassword";
import ResetPassword from "./resetPassword";

const singInSchema = z.object({
  email: z.string().email('Provide a valid e-mail').toLowerCase(),
  password: z.string().min(8, 'Must be at least 8 characters long'),
})

type singInFormDate = z.infer<typeof singInSchema>

interface SingInProps {
  searchParams?: {
    type: string;
    token: string;
  }
}

export default function SingIn({ searchParams }: SingInProps) {
  const methods = useForm<singInFormDate>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function activeUser(token: string) {
      await actionActivateUser({token})
    }

    if (searchParams && searchParams.type && searchParams.token) {
      if (searchParams.type = 'activate') {
        activeUser(searchParams.token)
      }
    }
  }, [])

  async function submitSingIn({ email, password }: singInFormDate) {
    const resp = await signIn(
      'credentials',
      {
        email,
        password,
        redirect: false,
      }
    )

    if (resp?.ok) {
      router.push('/restrict')
    } else {
      if (resp?.error) {
        setErrorMessage(resp.error)
      } else {
        setErrorMessage('There was a problem with your request.')
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center content-center w-full min-h-[80dvh]">
      <Form {...methods}>
        <ContainerDialog error={errorMessage}>
          <Title size="h1">Welcome!</Title>
          <form onSubmit={methods.handleSubmit(submitSingIn)}>
          <ContainerFields>
            <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input htmlFor="email" id="email" placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword id="password" htmlFor="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ContainerFields>
            <Button type="submit" size="full">Sing in</Button>
          </form>

          <ResetPassword />

          { searchParams &&
            searchParams.type &&
            searchParams.token &&
            searchParams.type === 'reset' &&
            <AlterPassword token={searchParams.token} />
          }

        </ContainerDialog>
      </Form>
    </div>
  );
}
