import Link from "next/link";

interface RoutePlaceholderProps {
  title: string;
  description: string;
}

export function RoutePlaceholder({ title, description }: RoutePlaceholderProps) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Route placeholder</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">{title}</h1>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">{description}</p>
      <Link href="/" className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700">Về danh sách sản phẩm</Link>
    </section>
  );
}
