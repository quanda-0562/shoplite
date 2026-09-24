import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../../lib/authOptions";
import { createOrder, parseOrders } from "../../lib/orders";
import { orderSchema } from "../../lib/schemas/order";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Vui lòng đăng nhập để đặt hàng." }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu đơn hàng không hợp lệ." }, { status: 400 });
  }

  const order = createOrder(parsed.data, session.user.email);
  const cookieStore = await cookies();
  const previousOrders = parseOrders(cookieStore.get("shoplite-orders")?.value);
  const orders = [order, ...previousOrders].slice(0, 10);

  // Demo persistence only. A production application should use a database instead of a cookie.
  cookieStore.set("shoplite-orders", JSON.stringify(orders), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ orderId: order.id, status: "received", itemCount: order.items.length }, { status: 201 });
}
