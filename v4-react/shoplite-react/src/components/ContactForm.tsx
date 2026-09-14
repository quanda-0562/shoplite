import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactFormValues } from '../schemas/contactSchema'

export function ContactForm() {
  const [message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  function onSubmit(data: ContactFormValues) {
    setMessage(`Đã nhận liên hệ của ${data.name}.`)
  }

  return (
    <form className="mt-5 grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Họ tên
        <input className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" aria-invalid={Boolean(errors.name)} {...register('name')} />
        {errors.name && <span className="text-xs text-rose-600">{errors.name.message}</span>}
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Email
        <input type="email" className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" aria-invalid={Boolean(errors.email)} {...register('email')} />
        {errors.email && <span className="text-xs text-rose-600">{errors.email.message}</span>}
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Nội dung
        <textarea rows={4} className="resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" aria-invalid={Boolean(errors.message)} {...register('message')} />
        {errors.message && <span className="text-xs text-rose-600">{errors.message.message}</span>}
      </label>
      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Gửi liên hệ</button>
      {message && <p className="text-sm text-emerald-700" aria-live="polite">{message}</p>}
    </form>
  )
}
