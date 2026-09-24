"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { CartStoreProvider } from "./store/cartStore";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartStoreProvider>{children}</CartStoreProvider>
    </SessionProvider>
  );
}
