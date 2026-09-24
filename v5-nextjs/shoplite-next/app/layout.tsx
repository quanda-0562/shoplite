import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Providers } from "./providers";
import { siteUrl } from "./lib/siteUrl";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "ShopLite | Mua sắm trực tuyến dễ dàng",
    template: "%s | ShopLite",
  },
  description: "Khám phá sản phẩm, tìm kiếm theo danh mục và mua sắm dễ dàng tại ShopLite.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
