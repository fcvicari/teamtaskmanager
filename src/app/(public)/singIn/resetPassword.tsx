'use client'

import { actionResetPassword } from "@/actions/resetPassword";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/alert/alert-dialog";
import { Button } from "@/components/button/button";
import { ContainerFields } from "@/components/container/containerFields";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/form/form";
import { Input } from "@/components/input/input";
import { resetPasswordFormDate, resetPasswordSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

export default function ResetPassword() {
  const { execute } = useServerAction(actionResetPassword) 

  const methods = useForm<resetPasswordFormDate>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function submitResetPassword(values: resetPasswordFormDate) {
    await execute(values)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full text-center">
          <Button variant="link" size="default">I forgot my password</Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col justify-center items-center content-center w-full">
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(submitResetPassword)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Password Reset</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter your email address below, and we will send you a link to create a new password.
                </AlertDialogDescription>
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
                </ContainerFields>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}