"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CartContents() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.getCartTotal());

  if (!items.length) {
    return <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><p className="text-slate-600">Giỏ hàng đang trống.</p><Link href="/" className="mt-4 inline-block font-bold text-blue-700 hover:underline">Xem sản phẩm</Link></section>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="grid grid-cols-[80px_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[80px_1fr_auto]">
            <Image src={item.thumbnail} alt={item.title} width={80} height={80} className="size-20 rounded-lg object-cover" />
            <div><h2 className="font-bold">{item.title}</h2><p className="mt-1 text-rose-600">{currency.format(item.price)}</p><div className="mt-3 flex items-center gap-2"><button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="size-8 rounded border border-slate-300 hover:bg-slate-100" aria-label={`Giảm số lượng ${item.title}`}>-</button><span className="w-7 text-center">{item.quantity}</span><button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="size-8 rounded border border-slate-300 hover:bg-slate-100" aria-label={`Tăng số lượng ${item.title}`}>+</button></div></div>
            <button type="button" onClick={() => removeFromCart(item.id)} className="self-start text-sm font-semibold text-rose-600 hover:underline">Xóa</button>
          </article>
        ))}
      </section>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-black">Tổng kết</h2><div className="mt-4 flex justify-between text-slate-600"><span>Tạm tính</span><span>{currency.format(total)}</span></div><div className="mt-2 flex justify-between text-slate-600"><span>Phí ship</span><span>Miễn phí</span></div><div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-black"><span>Tổng cộng</span><span className="text-rose-600">{currency.format(total)}</span></div><Link href="/checkout" className="mt-5 block rounded-lg bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700">Thanh toán</Link></aside>
    </div>
  );
}
