"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { supabase } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/signin");
        return;
      }
      setLoading(false);
    });
  }, [router]);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/signin");
      return;
    }

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      setError(orderError?.message ?? "Could not create order.");
      setSubmitting(false);
      return;
    }

    // 2. Insert the order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      setError(itemsError.message);
      setSubmitting(false);
      return;
    }

    // 3. Send confirmation email (non-blocking — order is already placed)
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          subject: `Order Confirmation #${order.id.slice(0, 8)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb;">Fans Only Fans</h1>
              <h2>Thank you for your order!</h2>
              <p>Hi there,</p>
              <p>Your order <strong>#${order.id.slice(0, 8)}</strong> has been received.</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="text-align: left; padding: 8px;">Item</th>
                    <th style="text-align: right; padding: 8px;">Qty</th>
                    <th style="text-align: right; padding: 8px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items
                    .map(
                      (i) => `
                    <tr>
                      <td style="padding: 8px;">${i.name}</td>
                      <td style="text-align: right; padding: 8px;">${i.quantity}</td>
                      <td style="text-align: right; padding: 8px;">₦${(i.price * i.quantity).toLocaleString()}</td>
                    </tr>`
                    )
                    .join("")}
                </tbody>
              </table>
              <p style="font-size: 18px;"><strong>Total: ₦${total.toLocaleString()}</strong></p>
              <p>We'll process your order shortly.</p>
              <p>— The Fans Only Fans Team</p>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.error("Email failed but order was placed:", emailError);
    }

    // 4. Clear the cart and go to success page
    clearCart();
    router.push(`/order-success?order=${order.id}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-6">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-4">
            <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1">
              <img
                src={item.image}
                alt={item.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold text-gray-900">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-medium">₦{total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Delivery</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold border-t border-blue-200 pt-2 mt-2">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}