"use server"

import { createNewUserSchema } from "@/schema/createNewUser";
import { revalidateTag } from "next/cache";
import { createServerAction, ZSAError } from "zsa";


export const actionSingUp = createServerAction()
  .input(createNewUserSchema)
  .handler(async ({ input: {name, email, password} }) => {
    const response = await fetch(process.env.BACKEND_URL + '/singup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password }),
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
