"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { checkoutSchema, type CheckoutValues } from "../lib/schemas/order";
import { useCartStore } from "../store/cartStore";

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  async function onSubmit(values: CheckoutValues) {
    setFormError(null);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, items }),
    });
    const result: { orderId?: string; message?: string } = await response.json().catch(() => ({}));

    if (!response.ok || !result.orderId) {
      setFormError(result.message ?? "Không thể tạo đơn hàng.");
      return;
    }

    clearCart();
    router.push(`/checkout/success?orderId=${encodeURIComponent(result.orderId)}`);
  }

  if (!items.length) {
    return <p className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-600">Giỏ hàng đang trống. Hãy thêm sản phẩm trước khi thanh toán.</p>;
  }

  return (
    <form className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="block text-sm font-semibold">Họ tên<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("fullName")} /></label>
      {errors.fullName && <p className="text-sm text-rose-600">{errors.fullName.message}</p>}
      <label className="block text-sm font-semibold">Email<input type="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("email")} /></label>
      {errors.email && <p className="text-sm text-rose-600">{errors.email.message}</p>}
      <label className="block text-sm font-semibold">Địa chỉ<textarea rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("address")} /></label>
      {errors.address && <p className="text-sm text-rose-600">{errors.address.message}</p>}
      <label className="block text-sm font-semibold">Số điện thoại<input inputMode="tel" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" {...register("phone")} /></label>
      {errors.phone && <p className="text-sm text-rose-600">{errors.phone.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-slate-400">{isSubmitting ? "Đang đặt hàng..." : "Đặt hàng"}</button>
      {formError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{formError}</p>}
    </form>
  );
}
