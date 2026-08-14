import { getProductById, products } from "@/lib/products";
import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  quantity: number;
  product?: Product;
};

export type CartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export const CART_STORAGE_KEY = "lumina-cart";
export const CART_UPDATED_EVENT = "lumina-cart-updated";
export const WHATSAPP_NUMBER = "5583993274989";

function normalizeCart(items: CartItem[]) {
  return items
    .filter((item) => item.product || getProductById(item.productId))
    .map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, Math.floor(item.quantity || 1)),
      product: item.product,
    }));
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawCart) {
      return [];
    }

    const parsedCart = JSON.parse(rawCart);
    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return normalizeCart(parsedCart);
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(items)));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addProductToCart(productId: string, quantity = 1, product?: Product) {
  const currentItems = readCart();
  const existingItem = currentItems.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.product = product ?? existingItem.product;
    writeCart(currentItems);
    return;
  }

  writeCart([...currentItems, { productId, quantity, product }]);
}

export function removeProductFromCart(productId: string) {
  writeCart(readCart().filter((item) => item.productId !== productId));
}

export function updateCartItemQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeProductFromCart(productId);
    return;
  }

  writeCart(
    readCart().map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    ),
  );
}

export function clearCart() {
  writeCart([]);
}

export function getCartLines(items: CartItem[]): CartLine[] {
  return items
    .map((item) => {
      const product =
        item.product ??
        products.find((currentProduct) => currentProduct.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((item): item is CartLine => Boolean(item));
}

export function getCartSubtotal(lines: CartLine[]) {
  return lines.reduce((total, item) => total + item.lineTotal, 0);
}

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function buildWhatsAppCheckoutUrl(lines: CartLine[], total: number) {
  const productLines = lines
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (${item.product.material ?? item.product.category}) - ${item.lineTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
    )
    .join("\n");

  const message = `Olá! Quero finalizar meu pedido na Lumina Semijoias:\n\n${productLines}\n\nTotal: ${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
