"use server"

import { changeProfileSchema } from "@/schema/userSchema";
import { revalidateTag } from "next/cache";
import { createServerAction, ZSAError } from "zsa";


export const actionChangeProfile = createServerAction()
  .input(changeProfileSchema)
  .handler(async ({ input: {name, email } }) => {
    const response = await fetch(process.env.BACKEND_URL + '/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
      cache: 'no-store',
    })
    .catch(() => {
      throw new ZSAError(
        "ERROR",
        "Error accessing the new user registration service."
      )
    })

    if (response.status !== 200 && response.status !== 201) {
      const { message } = await response.json()

      throw new ZSAError("INPUT_PARSE_ERROR", message)
    }


    revalidateTag('list-users')

    return await response.json()
  })
