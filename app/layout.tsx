import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "./header";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Fans Only Fans",
  description:
    "Premium fans for every room — ceiling, standing, table, and industrial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Fans Only Fans
                </h3>
                <p className="text-gray-500">
                  Premium fans for every room. Quality you can feel, prices you
                  can trust.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shop</h3>
                <ul className="space-y-1 text-gray-500">
                  <li>
                    <Link href="/" className="hover:text-blue-600">
                      All Fans
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="hover:text-blue-600">
                      Your Cart
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-500">Lagos, Nigeria</p>
                <p className="text-gray-500">support@fansonlyfans.demo</p>
              </div>
            </div>
            <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Fans Only Fans — HNG15 Lesson 2 demo
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}