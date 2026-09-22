import Link from "next/link";
import { LoginForm } from "../components/LoginForm";

type LoginPageProps = { searchParams: Promise<{ from?: string | string[] }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { from } = await searchParams;
  const callbackUrl = typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/";

  return <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><Link href="/" className="text-sm font-semibold text-blue-700 hover:underline">Về trang chủ</Link><h1 className="mt-4 text-3xl font-black">Đăng nhập</h1><p className="mt-2 text-sm text-slate-600">Tài khoản mẫu: <code>emilys</code> / <code>emilyspass</code>.</p><LoginForm callbackUrl={callbackUrl} /></section>;
}
