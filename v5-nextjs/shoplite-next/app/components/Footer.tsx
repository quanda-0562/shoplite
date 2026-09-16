import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>ShopLite Next.js practice.</p>
        <div className="flex gap-4">
          <Link href="/login">Tài khoản</Link>
          <Link href="/orders">Đơn hàng</Link>
        </div>
      </div>
    </footer>
  );
}
