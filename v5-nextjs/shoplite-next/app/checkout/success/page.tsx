import Link from "next/link";

type SuccessPageProps = { searchParams: Promise<{ orderId?: string | string[] }> };

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;
  const id = typeof orderId === "string" ? orderId : "";

  return <section className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Đặt hàng thành công</p><h1 className="mt-2 text-3xl font-black text-emerald-950">Cảm ơn bạn!</h1><p className="mt-4 text-emerald-900">Mã đơn hàng: <strong>{id || "đang xử lý"}</strong></p><div className="mt-6 flex justify-center gap-4"><Link href="/orders" className="rounded-lg bg-emerald-700 px-4 py-3 font-bold text-white hover:bg-emerald-800">Xem đơn hàng</Link><Link href="/" className="rounded-lg border border-emerald-700 px-4 py-3 font-bold text-emerald-800 hover:bg-emerald-100">Tiếp tục mua</Link></div></section>;
}
