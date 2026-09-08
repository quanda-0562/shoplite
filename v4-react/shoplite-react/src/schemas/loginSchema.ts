import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng.'),
  password: z.string().min(6, 'Mật khẩu cần ít nhất 6 ký tự.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
