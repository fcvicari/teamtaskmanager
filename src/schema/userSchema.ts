import { z } from "zod"

export const createNewUserSchema = z
  .object({
    name: z.string().min(1, 'Enter your name'),
    email: z.string().email('Provide a valid e-mail').toLowerCase(),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
    checkPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['checkPassword'],
        message: 'Passwords must be the same',
      })
    }
  })

export type createNewUserFormDate = z.infer<typeof createNewUserSchema>


export const resetPasswordSchema = z
  .object({
    email: z.string().email('Provide a valid e-mail').toLowerCase(),
  })

export type resetPasswordFormDate = z.infer<typeof resetPasswordSchema>



export const alterPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
    checkPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['checkPassword'],
        message: 'Passwords must be the same',
      })
    }
  })

export type alterPasswordFormDate = z.infer<typeof alterPasswordSchema>
