'use client'

import { ButtonLink } from "@/components/button/buttonLink";
import { ContainerDialog } from "@/components/container/containerDialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/inputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singUpSchema = z
  .object({
    name: z.string().min(1, 'Informe seu nome'),
    email: z.string().email('Informe um e-mail válido.').toLowerCase(),
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres.')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Deve conter letras maiúsculas, minúsculas e números.',
      }),
    checkPassword: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres.')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Deve conter letras maiúsculas, minúsculas e números.',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['checkPassword'],
        message: 'As senhas devem ser iguais.',
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
          <Title size="h1">Criar minha conta</Title>
          <form onSubmit={methods.handleSubmit(submitSingUp)}>
          <ContainerFields>
            <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <Input htmlFor="name" id="name" required placeholder="Informe seu nome" {...field} />
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
                    <FormLabel htmlFor="email">E-Mail</FormLabel>
                    <FormControl>
                      <Input htmlFor="email" id="email" required placeholder="Informe seu e-mail" {...field} />
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
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <InputPassword id="password" htmlFor="password" required placeholder="Informe sua senha" {...field} />
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
                    <FormLabel htmlFor="checkPassword">Confirme sua senha</FormLabel>
                    <FormControl>
                      <InputPassword id="checkPassword" htmlFor="checkPassword" required placeholder="Confirme sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ContainerFields>
            <Button type="submit" size="full">Criar conta</Button>
          </form>
          <ButtonLink variant="link" url="/singIn" label="Voltar para o login" />
        </ContainerDialog>
      </Form>
    </div>
  );
}
