import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên cần ít nhất 2 ký tự."),
  email: z.email("Email không hợp lệ."),
  address: z.string().trim().min(10, "Địa chỉ cần ít nhất 10 ký tự."),
  phone: z.string().trim().regex(/^(?:\+84|0)\d{9,10}$/, "Số điện thoại Việt Nam không hợp lệ."),
});

const cartItemSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  thumbnail: z.string().url(),
  category: z.string().min(1),
  rating: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const orderSchema = checkoutSchema.extend({
  items: z.array(cartItemSchema).min(1, "Giỏ hàng đang trống."),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
