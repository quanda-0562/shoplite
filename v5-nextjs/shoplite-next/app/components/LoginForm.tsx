"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginValues } from "../lib/schemas/login";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "emilys", password: "emilyspass" },
  });

  async function onSubmit(values: LoginValues) {
    setFormError(null);
    const result = await signIn("credentials", { ...values, redirect: false });

    if (result?.error) {
      setFormError("Username hoặc mật khẩu không đúng.");
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="block text-sm font-semibold">Username<input autoComplete="username" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("username")} /></label>
      {errors.username && <p className="text-sm text-rose-600">{errors.username.message}</p>}
      <label className="block text-sm font-semibold">Mật khẩu<input type="password" autoComplete="current-password" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("password")} /></label>
      {errors.password && <p className="text-sm text-rose-600">{errors.password.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-slate-400">{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</button>
      {formError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{formError}</p>}
    </form>
  );
}
