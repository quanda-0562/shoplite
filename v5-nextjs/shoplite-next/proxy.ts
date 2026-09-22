import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authSecret = process.env.NEXTAUTH_SECRET ?? "development-only-secret-change-in-production";

// Next.js 16 calls this request guard Proxy; it replaces middleware.ts.
export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: authSecret });
  if (token) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/orders", "/checkout/:path*"],
};
