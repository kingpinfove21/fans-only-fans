import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { AddToCartButton } from "./add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-blue-600 font-medium">{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-white rounded-xl border border-gray-200 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            ₦{product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-blue-800">
            ✓ Free delivery within Lagos &nbsp;·&nbsp; ✓ 1-year warranty
            &nbsp;·&nbsp; ✓ Secure checkout
          </div>

          <AddToCartButton product={product} />
          <p className="text-xs text-gray-400 text-center mt-3">
            Sign in required at checkout
          </p>
        </div>
      </div>
    </div>
  );
}