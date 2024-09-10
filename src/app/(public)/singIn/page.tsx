'use client'

import { Container } from "@/components/container/container";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singInSchema = z.object({
  email: z.string().email('Provide a valid e-mail').toLowerCase(),
  password: z.string().min(8, 'Must be at least 8 characters long'),
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
        <Container>
          <Title size="h1">Bem-vindo!</Title>
          <form onSubmit={methods.handleSubmit(submitSingIn)} className="space-y-4">
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Mail" {...field} />
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
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="full">Entrar</Button>
          </form>
          <Label className="w-full text-center">Esqueci minha senha</Label>
        </Container>
      </Form>
    </div>
  );
}
