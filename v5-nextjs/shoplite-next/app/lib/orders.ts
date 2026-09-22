import "server-only";
import type { OrderInput } from "./schemas/order";

export type SavedOrder = OrderInput & {
  id: string;
  userEmail: string;
  createdAt: string;
};

export function createOrder(input: OrderInput, userEmail: string): SavedOrder {
  return {
    ...input,
    id: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    userEmail,
    createdAt: new Date().toISOString(),
  };
}

export function parseOrders(value: string | undefined): SavedOrder[] {
  if (!value) return [];

  try {
    const orders: unknown = JSON.parse(value);
    return Array.isArray(orders) ? orders as SavedOrder[] : [];
  } catch {
    return [];
  }
}

export function getOrdersForUser(orders: SavedOrder[], userEmail: string): SavedOrder[] {
  return orders.filter((order) => order.userEmail === userEmail);
}
