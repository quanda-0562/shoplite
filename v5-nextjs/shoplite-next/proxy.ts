import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16 uses proxy.ts in place of the deprecated middleware.ts convention.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.get("demo_session")?.value === "1";

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders", "/checkout"],
};
