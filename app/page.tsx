import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cool Air. Fair Prices. Fast Delivery.
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            Premium fans for every room — ceiling, standing, table, rechargeable,
            and industrial. Quality you can feel.
          </p>
          <a
            href="#shop"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Shop All Fans
          </a>
        </div>
      </section>

      {/* Category chips */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Browse by category
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-sm bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section id="shop" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          All Fans ({products.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="aspect-square bg-white flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-5 border-t border-gray-100">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                <h3 className="font-semibold text-gray-900 mb-3 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}