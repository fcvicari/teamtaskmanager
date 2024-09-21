"use server"

import { redirect } from "next/navigation";

interface ActivateUserProps {
  token: string;
}

export const actionActivateUser = async ({ token }: ActivateUserProps) => {
  await fetch(process.env.BACKEND_URL + `/activate?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  redirect('/singIn')
}
