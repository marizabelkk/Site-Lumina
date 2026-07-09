import { CatalogClient } from "@/components/products/CatalogClient";
import { getProducts } from "@/services/productService";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

type CatalogoPageProps = {
  searchParams?: Promise<{
    busca?: string | string[];
    categoria?: string | string[];
  }>;
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  let products: Product[] = [];
  let errorMessage: string | undefined;
  const params = await searchParams;
  const categoryParam = Array.isArray(params?.categoria)
    ? params?.categoria[0]
    : params?.categoria;
  const searchParam = Array.isArray(params?.busca) ? params?.busca[0] : params?.busca;

  try {
    products = await getProducts();
  } catch {
    errorMessage =
      "Não foi possível carregar os produtos no momento. Tente novamente em alguns instantes.";
  }

  return (
    <CatalogClient
      errorMessage={errorMessage}
      key={`${categoryParam || "todos"}-${searchParam || "busca-vazia"}`}
      initialCategory={categoryParam}
      initialProducts={products}
      initialSearchTerm={searchParam}
    />
  );
}
