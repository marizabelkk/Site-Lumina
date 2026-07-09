"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addProductToCart,
  buildWhatsAppCheckoutUrl,
  CART_UPDATED_EVENT,
  clearCart,
  type CartItem,
  getCartItemCount,
  getCartLines,
  getCartSubtotal,
  readCart,
  removeProductFromCart,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { Product } from "@/types/product";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const refreshCart = useCallback(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    const loadCartTimer = window.setTimeout(refreshCart, 0);

    window.addEventListener(CART_UPDATED_EVENT, refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.clearTimeout(loadCartTimer);
      window.removeEventListener(CART_UPDATED_EVENT, refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, [refreshCart]);

  const lines = useMemo(() => getCartLines(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(lines), [lines]);
  const totalItems = useMemo(() => getCartItemCount(items), [items]);

  const addItem = useCallback((productId: string, quantity = 1, product?: Product) => {
    addProductToCart(productId, quantity, product);
    refreshCart();
  }, [refreshCart]);

  const removeItem = useCallback((productId: string) => {
    removeProductFromCart(productId);
    refreshCart();
  }, [refreshCart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    refreshCart();
  }, [refreshCart]);

  const clearItems = useCallback(() => {
    clearCart();
    refreshCart();
  }, [refreshCart]);

  const checkoutUrl = useMemo(
    () => buildWhatsAppCheckoutUrl(lines, subtotal),
    [lines, subtotal],
  );

  return {
    items,
    lines,
    subtotal,
    total: subtotal,
    totalItems,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    checkoutUrl,
  };
}
