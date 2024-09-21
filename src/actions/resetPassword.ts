"use server"

import { resetPasswordSchema } from "@/schema/userSchema";
import { createServerAction, ZSAError } from "zsa";


export const actionResetPassword = createServerAction()
  .input(resetPasswordSchema)
  .handler(async ({ input: { email } }) => {
    await fetch(process.env.BACKEND_URL + '/recoverpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    })
    .catch(() => {
      throw new ZSAError(
        "ERROR",
        "Error accessing the new user registration service."
      )
    })
  })
