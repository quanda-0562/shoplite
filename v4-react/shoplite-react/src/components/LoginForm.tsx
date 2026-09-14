import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema'

export function LoginForm() {
  const [message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  function onSubmit(data: LoginFormValues) {
    setMessage(`Đăng nhập hợp lệ: ${data.email}`)
  }

  return (
    <form className="mt-5 grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Email
        <input type="email" className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" aria-invalid={Boolean(errors.email)} {...register('email')} />
        {errors.email && <span className="text-xs text-rose-600">{errors.email.message}</span>}
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Mật khẩu
        <input type="password" className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" aria-invalid={Boolean(errors.password)} {...register('password')} />
        {errors.password && <span className="text-xs text-rose-600">{errors.password.message}</span>}
      </label>
      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Đăng nhập</button>
      {message && <p className="text-sm text-emerald-700" aria-live="polite">{message}</p>}
    </form>
  )
}
