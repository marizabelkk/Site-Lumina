import { supabase } from "@/lib/supabase";
import type { Product, ProductFormData } from "@/types/product";

type SupabaseProduct = {
  id: string | number;
  reference: string | null;
  name: string | null;
  description: string | null;
  price: number | string | null;
  category: string | null;
  image: string | null;
  is_new: boolean | null;
  available: boolean | null;
  featured: boolean | null;
  created_at: string | null;
};

type SupabaseLikeError = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  status?: number;
  statusCode?: number | string;
};

const productSelect =
  "id, reference, name, description, price, category, image, is_new, available, featured, created_at";

function ensureSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase nao esta configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return supabase;
}

async function ensureAuthenticatedAdmin() {
  const client = ensureSupabase();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw error;
  }

  if (!data.session) {
    throw new Error("Sua sessao expirou. Entre novamente para salvar produtos.");
  }

  return client;
}

function mapProduct(product: SupabaseProduct): Product {
  return {
    id: String(product.id),
    reference: product.reference ?? undefined,
    name: product.name ?? "Produto sem nome",
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    category: product.category ?? "Sem categoria",
    image: product.image ?? "",
    available: Boolean(product.available),
    isNew: Boolean(product.is_new),
    featured: Boolean(product.featured),
    createdAt: product.created_at ?? undefined,
  };
}

function handleProductError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  if (error && typeof error === "object") {
    const supabaseError = error as SupabaseLikeError;
    const details = [
      supabaseError.message,
      supabaseError.details,
      supabaseError.hint,
      supabaseError.code ? `Codigo: ${supabaseError.code}` : undefined,
      supabaseError.status || supabaseError.statusCode
        ? `Status: ${supabaseError.status ?? supabaseError.statusCode}`
        : undefined,
    ].filter(Boolean);

    if (details.length) {
      throw new Error(details.join(" "));
    }
  }

  throw new Error("Nao foi possivel concluir a operacao com os produtos.");
}

function toProductPayload(product: ProductFormData) {
  return {
    reference: product.reference.trim() || null,
    name: product.name.trim(),
    description: product.description.trim(),
    price: product.price,
    category: product.category.trim(),
    image: product.image.trim(),
    is_new: product.isNew,
    available: product.available,
    featured: product.featured,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const client = ensureSupabase();
    const { data, error } = await client
      .from("products")
      .select(productSelect)
      .eq("available", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((product) => mapProduct(product as SupabaseProduct));
  } catch (error) {
    handleProductError(error);
  }
}

export async function getAdminProducts(): Promise<Product[]> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const { data, error } = await client
      .from("products")
      .select(productSelect)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((product) => mapProduct(product as SupabaseProduct));
  } catch (error) {
    handleProductError(error);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const client = ensureSupabase();
    const { data, error } = await client
      .from("products")
      .select(productSelect)
      .eq("id", id)
      .eq("available", true)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? mapProduct(data as SupabaseProduct) : null;
  } catch (error) {
    handleProductError(error);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const client = ensureSupabase();
    const { data, error } = await client
      .from("products")
      .select(productSelect)
      .eq("featured", true)
      .eq("available", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((product) => mapProduct(product as SupabaseProduct));
  } catch (error) {
    handleProductError(error);
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const client = ensureSupabase();
    const { data, error } = await client
      .from("products")
      .select(productSelect)
      .eq("category", category)
      .eq("available", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((product) => mapProduct(product as SupabaseProduct));
  } catch (error) {
    handleProductError(error);
  }
}

export async function createProduct(product: ProductFormData): Promise<Product> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const { data, error } = await client
      .from("products")
      .insert(toProductPayload(product))
      .select(productSelect)
      .single();

    if (error) {
      throw error;
    }

    return mapProduct(data as SupabaseProduct);
  } catch (error) {
    handleProductError(error);
  }
}

export async function updateProduct(
  id: string,
  product: ProductFormData,
): Promise<Product> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const { data, error } = await client
      .from("products")
      .update(toProductPayload(product))
      .eq("id", id)
      .select(productSelect)
      .single();

    if (error) {
      throw error;
    }

    return mapProduct(data as SupabaseProduct);
  } catch (error) {
    handleProductError(error);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const { error } = await client.from("products").delete().eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    handleProductError(error);
  }
}

export async function updateProductFlags(
  id: string,
  flags: Partial<Pick<ProductFormData, "available" | "featured" | "isNew">>,
): Promise<Product> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const payload: Record<string, boolean> = {};

    if (typeof flags.available === "boolean") {
      payload.available = flags.available;
    }

    if (typeof flags.featured === "boolean") {
      payload.featured = flags.featured;
    }

    if (typeof flags.isNew === "boolean") {
      payload.is_new = flags.isNew;
    }

    const { data, error } = await client
      .from("products")
      .update(payload)
      .eq("id", id)
      .select(productSelect)
      .single();

    if (error) {
      throw error;
    }

    return mapProduct(data as SupabaseProduct);
  } catch (error) {
    handleProductError(error);
  }
}

export async function uploadProductImage(file: File): Promise<string> {
  try {
    const client = await ensureAuthenticatedAdmin();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    const filePath = `products/${Date.now()}-${safeName || "produto"}.${extension}`;
    const { error } = await client.storage.from("imagens").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      throw error;
    }

    const { data } = client.storage.from("imagens").getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    handleProductError(error);
  }
}
