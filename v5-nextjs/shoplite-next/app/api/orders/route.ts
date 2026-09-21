import { NextResponse } from "next/server";

interface OrderRequest {
  items?: unknown;
}

export async function POST(request: Request) {
  const body: OrderRequest = await request.json().catch(() => ({}));

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ message: "Đơn hàng cần có ít nhất một sản phẩm." }, { status: 400 });
  }

  // Server-side simulation: real checkout will persist this order in a database later.
  const orderId = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  return NextResponse.json({ orderId, status: "received", itemCount: body.items.length }, { status: 201 });
}
