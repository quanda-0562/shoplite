import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/login";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "development-only-secret-change-in-production",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "DummyJSON",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, expiresInMins: 60 }),
        });

        if (!response.ok) return null;

        const user: { id: number; firstName: string; lastName: string; email: string; image?: string } = await response.json();
        return { id: String(user.id), name: `${user.firstName} ${user.lastName}`, email: user.email, image: user.image };
      },
    }),
  ],
};
