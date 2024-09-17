'use client'

import { actionSingUp } from "@/actions/singUp";
import { Button } from "@/components/button/button";
import { ButtonLink } from "@/components/button/buttonLink";
import { ContainerDialog } from "@/components/container/containerDialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/form/form";
import { Input } from "@/components/input/input";
import { InputPassword } from "@/components/input/inputPassword";
import { Title } from "@/components/title";
import { createNewUserFormDate, createNewUserSchema } from "@/schema/createNewUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

export default function SingUp() {
  const { isPending, execute, error } = useServerAction(actionSingUp) 
  const router = useRouter()

  const methods = useForm<createNewUserFormDate>({
    resolver: zodResolver(createNewUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      checkPassword: '',
    }
  })

  async function submitSingUp(values: createNewUserFormDate) {
    const [ data ] = await execute(values)

    if (data) {
      router.push('/singIn')
    }
  }

  return (
    <div className="flex justify-center items-center content-center w-full min-h-[80dvh]">
      <Form {...methods}>
        <ContainerDialog error={error?.message}>
          <Title size="h1">Register new user</Title>
          <form onSubmit={methods.handleSubmit(submitSingUp)}>
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

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        id="password"
                        htmlFor="password"
                        required
                        placeholder="Password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="checkPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        id="checkPassword"
                        htmlFor="checkPassword"
                        required
                        placeholder="Confirm your password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ContainerFields>
            <Button type="submit" size="full" isSubmitting={isPending} disabled={isPending}>Register</Button>
          </form>
          <ButtonLink variant="link" url="/singIn" label="Back to login" icon={ArrowLeft} />
        </ContainerDialog>
      </Form>
    </div>
  );
}
