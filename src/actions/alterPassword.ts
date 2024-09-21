"use server"

import { alterPasswordSchema } from "@/schema/userSchema";
import { redirect } from "next/navigation";
import { createServerAction, ZSAError } from "zsa";

export const actionAlterPassword = createServerAction()
  .input(alterPasswordSchema)
  .handler(async ({ input: { password, token }}) => {
    await fetch(process.env.BACKEND_URL + `/alterpass?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
      cache: 'no-store',
    })
    .catch(() => {
      throw new ZSAError(
        "ERROR",
        "Error accessing the new user registration service."
      )
    })

    redirect('/singIn')
  })
