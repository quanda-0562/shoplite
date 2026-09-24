import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Vui lòng nhập username."),
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export type LoginValues = z.infer<typeof loginSchema>;
