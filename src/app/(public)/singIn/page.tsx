'use client'

import { ContainerDialog } from "@/components/container/containerDialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/inputPassword";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singInSchema = z.object({
  email: z.string().email('Informe um e-mail válido').toLowerCase(),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
})

type singInFormDate = z.infer<typeof singInSchema>

export default function SingIn() {
  const methods = useForm<singInFormDate>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function submitSingIn({ email, password }: singInFormDate) {
    console.log(email, password)
  }

  return (
    <div className="flex justify-center items-center content-center w-full min-h-[80dvh]">
      <Form {...methods}>
        <ContainerDialog>
          <Title size="h1">Bem-vindo!</Title>
          <form onSubmit={methods.handleSubmit(submitSingIn)}>
          <ContainerFields>
            <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">E-Mail</FormLabel>
                    <FormControl>
                      <Input htmlFor="email" id="email" placeholder="Informe seu e-mail" {...field} />
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
                      <InputPassword id="password" htmlFor="password" placeholder="Informe seu senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ContainerFields>
            <Button type="submit" size="full">Entrar</Button>
          </form>
          <Label className="w-full text-center py-4">Esqueci minha senha</Label>
        </ContainerDialog>
      </Form>
    </div>
  );
}
