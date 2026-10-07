"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse fans
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Cart ({count})
      </h1>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-4">
            <div className="w-20 h-20 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold text-gray-900">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-red-500 hover:text-red-700 text-sm ml-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-2xl font-bold text-gray-900">
          Total: ₦{total.toLocaleString()}
        </p>
        <button
          onClick={() => router.push("/checkout")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}