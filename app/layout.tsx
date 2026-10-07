import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌀</span>
              <span className="text-xl font-bold text-blue-600">
                Fans Only Fans
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/cart"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Cart
              </Link>
              <Link
                href="/signin"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </header>
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
      </body>
    </html>
  );
}