"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type OrderRow = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

type OrderItemRow = {
  order_id: string;
  product_name: string;
  price: number;
  quantity: number;
};

export default function OrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [itemsByOrder, setItemsByOrder] = useState<
    Record<string, OrderItemRow[]>
  >({});

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      const { data: orderRows } = await supabase
        .from("orders")
        .select("id, total, status, created_at")
        .order("created_at", { ascending: false });

      setOrders(orderRows ?? []);

      if (orderRows && orderRows.length > 0) {
        const ids = orderRows.map((o) => o.id);
        const { data: itemRows } = await supabase
          .from("order_items")
          .select("order_id, product_name, price, quantity")
          .in("order_id", ids);

        const grouped: Record<string, OrderItemRow[]> = {};
        (itemRows ?? []).forEach((row) => {
          if (!grouped[row.order_id]) grouped[row.order_id] = [];
          grouped[row.order_id].push(row);
        });
        setItemsByOrder(grouped);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No orders yet
        </h1>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  Order #{order.id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                {order.status}
              </span>
            </div>

            <ul className="space-y-1 mb-4">
              {(itemsByOrder[order.id] ?? []).map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₦{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}