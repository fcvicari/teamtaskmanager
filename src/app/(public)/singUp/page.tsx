'use client'

import { Button } from "@/components/button/button";
import { ButtonLink } from "@/components/button/buttonLink";
import { ContainerDialog } from "@/components/container/containerDialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/form/form";
import { Input } from "@/components/input/input";
import { InputPassword } from "@/components/input/inputPassword";
import { Title } from "@/components/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singUpSchema = z
  .object({
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

type singUpFormDate = z.infer<typeof singUpSchema>

export default function SingUp() {
  const methods = useForm<singUpFormDate>({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      checkPassword: '',
    },
  })

  async function submitSingUp({ name, email, password, checkPassword }: singUpFormDate) {
    console.log(name, email, password, checkPassword)
  }

  return (
    <div className="flex justify-center items-center content-center w-full min-h-[80dvh]">
      <Form {...methods}>
        <ContainerDialog>
          <Title size="h1">Register new user</Title>
          <form onSubmit={methods.handleSubmit(submitSingUp)}>
          <ContainerFields>
            <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input htmlFor="name" id="name" required placeholder="Name" {...field} />
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
                      <Input htmlFor="email" id="email" required placeholder="E-mail" {...field} />
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
                      <InputPassword id="password" htmlFor="password" required placeholder="Password" {...field} />
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
                      <InputPassword id="checkPassword" htmlFor="checkPassword" required placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ContainerFields>
            <Button type="submit" size="full">Register</Button>
          </form>
          <ButtonLink variant="link" url="/singIn" label="Back to login" icon={ArrowLeft} />
        </ContainerDialog>
      </Form>
    </div>
  );
}
