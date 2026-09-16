import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Route: /</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Danh sách sản phẩm</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Khung trang chủ đã sẵn sàng. Danh sách và dữ liệu sản phẩm sẽ được thêm ở các ngày sau.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/product/1" className="rounded-xl border border-slate-200 bg-white p-5 font-bold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow">Chi tiết sản phẩm mẫu</Link>
        <Link href="/cart" className="rounded-xl border border-slate-200 bg-white p-5 font-bold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow">Giỏ hàng</Link>
        <Link href="/checkout" className="rounded-xl border border-slate-200 bg-white p-5 font-bold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow">Thanh toán</Link>
      </div>
    </section>
  );
}
