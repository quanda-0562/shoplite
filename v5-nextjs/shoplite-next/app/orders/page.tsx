import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";
import { getOrdersForUser, parseOrders } from "../lib/orders";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login?from=/orders");
  const cookieStore = await cookies();
  const orders = getOrdersForUser(parseOrders(cookieStore.get("shoplite-orders")?.value), session.user.email);

  return <section><h1 className="text-3xl font-black">Đơn hàng của tôi</h1><p className="mt-2 text-slate-600">{session.user.name ?? session.user.email}</p>{orders.length ? <div className="mt-6 space-y-3">{orders.map((order) => <article key={order.id} className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{order.id}</strong><time className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString("vi-VN")}</time></div><p className="mt-2 text-sm text-slate-600">{order.items.reduce((total, item) => total + item.quantity, 0)} sản phẩm, giao đến {order.address}</p></article>)}</div> : <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-slate-600">Bạn chưa có đơn hàng nào.</p>}</section>;
}
