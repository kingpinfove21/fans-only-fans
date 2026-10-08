"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase/client";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  count: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartRow = {
  product_id: string;
  product_name: string;
  price: number;
  image: string;
  quantity: number;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Track auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch cart when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setItems([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("product_id, product_name, price, image, quantity")
        .eq("user_id", userId);

      if (!error && data) {
        setItems(
          data.map((row: CartRow) => ({
            productId: row.product_id,
            name: row.product_name,
            price: row.price,
            image: row.image,
            quantity: row.quantity,
          }))
        );
      }
      setLoading(false);
    };

    fetchCart();
  }, [userId]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`cart-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart_items",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as CartRow;
            setItems((prev) => {
              const existing = prev.find(
                (i) => i.productId === row.product_id
              );
              if (existing) {
                return prev.map((i) =>
                  i.productId === row.product_id
                    ? { ...i, quantity: row.quantity }
                    : i
                );
              }
              return [
                ...prev,
                {
                  productId: row.product_id,
                  name: row.product_name,
                  price: row.price,
                  image: row.image,
                  quantity: row.quantity,
                },
              ];
            });
          } else if (payload.eventType === "UPDATE") {
            const row = payload.new as CartRow;
            setItems((prev) =>
              prev.map((i) =>
                i.productId === row.product_id
                  ? { ...i, quantity: row.quantity }
                  : i
              )
            );
          } else if (payload.eventType === "DELETE") {
            const row = payload.old as Partial<CartRow>;
            setItems((prev) =>
              prev.filter((i) => i.productId !== row.product_id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">) => {
      if (!userId) return;

      const existing = items.find((i) => i.productId === item.productId);
      const newQuantity = existing ? existing.quantity + 1 : 1;

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("user_id", userId)
          .eq("product_id", item.productId);
      } else {
        await supabase.from("cart_items").insert({
          user_id: userId,
          product_id: item.productId,
          product_name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        });
      }
    },
    [userId, items]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      if (!userId) return;
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);
    },
    [userId]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (!userId || quantity < 1) return;
      await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", userId)
        .eq("product_id", productId);
    },
    [userId]
  );

  const clearCart = useCallback(async () => {
    if (!userId) return;
    await supabase.from("cart_items").delete().eq("user_id", userId);
  }, [userId]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}