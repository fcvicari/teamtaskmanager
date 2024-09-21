'use client'

import { actionAlterPassword } from "@/actions/alterPassword";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/alert/alert-dialog";
import { ContainerFields } from "@/components/container/containerFields";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/form/form";
import { InputPassword } from "@/components/input/inputPassword";
import { alterPasswordFormDate, alterPasswordSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

interface AlterPasswordProps {
  token: string;
}

export default function AlterPassword({ token }: AlterPasswordProps) {
  const { execute, isPending } = useServerAction(actionAlterPassword) 
  const [isOpen, setIsOpen] = useState(true)

  const methods = useForm<alterPasswordFormDate>({
    resolver: zodResolver(alterPasswordSchema),
    defaultValues: {
      token: token,
      password: '',
      checkPassword: '',
    },
  })

  if (!token) {
    return null
  }

  async function submitAlterPassword(values: alterPasswordFormDate) {
    await execute( {...values, token } )
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div className="flex flex-col justify-center items-center content-center w-full">
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(submitAlterPassword)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Create new password</AlertDialogTitle>
                <AlertDialogDescription>
                  Please enter your new password below to reset your account. Make sure it meets the security requirements.
                </AlertDialogDescription>
                <ContainerFields>
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
                            disabled={isPending}
                            placeholder="Password"
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
                            disabled={isPending}
                            required
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ContainerFields>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending} onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={isPending} type="submit">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}