import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Tên cần ít nhất 2 ký tự.'),
  email: z.string().email('Email không đúng định dạng.'),
  message: z.string().min(10, 'Nội dung cần ít nhất 10 ký tự.'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
