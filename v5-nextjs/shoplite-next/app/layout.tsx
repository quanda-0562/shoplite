import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopLite",
  description: "ShopLite built with Next.js",
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
