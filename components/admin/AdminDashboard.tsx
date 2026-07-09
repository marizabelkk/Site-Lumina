"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";
import { getCurrentSession, signOutAdmin } from "@/services/authService";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
  updateProductFlags,
} from "@/services/productService";
import type { Product, ProductFormData } from "@/types/product";

type AdminMode = "list" | "create" | "edit";

export function AdminDashboard() {
  const router = useRouter();
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [mode, setMode] = useState<AdminMode>("list");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [busyProductId, setBusyProductId] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      }),
    [products],
  );
  const adminStats = useMemo(
    () => [
      { label: "Total", value: products.length },
      {
        label: "Disponiveis",
        value: products.filter((product) => product.available).length,
      },
      {
        label: "Destaques",
        value: products.filter((product) => product.featured).length,
      },
      {
        label: "Novos",
        value: products.filter((product) => product.isNew).length,
      },
    ],
    [products],
  );

  useEffect(() => {
    let isMounted = true;

    async function prepareAdmin() {
      try {
        const session = await getCurrentSession();

        if (!session) {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setSessionEmail(session.user.email ?? null);
        }

        try {
          const nextProducts = await getAdminProducts();

          if (isMounted) {
            setProducts(nextProducts);
          }
        } catch (error) {
          if (isMounted) {
            setErrorMessage(
              error instanceof Error
                ? error.message
                : "Nao foi possivel carregar os produtos.",
            );
          }
        }
      } catch {
        router.replace("/login");
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
          setIsLoadingProducts(false);
        }
      }
    }

    prepareAdmin();

    return () => {
      isMounted = false;
    };
  }, [router]);

  function showList() {
    setMode("list");
    setEditingProduct(null);
  }

  function handleCreate() {
    setMessage("");
    setErrorMessage("");
    setEditingProduct(null);
    setMode("create");
  }

  function handleEdit(product: Product) {
    setMessage("");
    setErrorMessage("");
    setEditingProduct(product);
    setMode("edit");
  }

  async function handleSubmit(productData: ProductFormData) {
    setIsSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (mode === "edit" && editingProduct) {
        const updatedProduct = await updateProduct(editingProduct.id, productData);
        setProducts((current) =>
          current.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        );
        setMessage("Produto atualizado com sucesso.");
      } else {
        const createdProduct = await createProduct(productData);
        setProducts((current) => [createdProduct, ...current]);
        setMessage("Produto cadastrado com sucesso.");
      }

      showList();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Nao foi possivel salvar o produto.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(`Excluir "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    setBusyProductId(product.id);
    setMessage("");
    setErrorMessage("");

    try {
      await deleteProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setMessage("Produto excluido com sucesso.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Nao foi possivel excluir o produto.",
      );
    } finally {
      setBusyProductId("");
    }
  }

  async function handleToggle(
    product: Product,
    flag: "available" | "featured" | "isNew",
  ) {
    setBusyProductId(product.id);
    setMessage("");
    setErrorMessage("");

    try {
      const updatedProduct = await updateProductFlags(product.id, {
        [flag]: !product[flag],
      });
      setProducts((current) =>
        current.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Nao foi possivel atualizar o produto.",
      );
    } finally {
      setBusyProductId("");
    }
  }

  async function handleLogout() {
    await signOutAdmin();
    router.replace("/login");
  }

  if (isCheckingSession) {
    return (
      <main className="admin-page">
        <div className="admin-loading">Verificando acesso...</div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container admin-shell">
        <AdminHeader email={sessionEmail} onLogout={handleLogout} />

        {message ? (
          <p className="admin-message admin-message-success" role="status">
            {message}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="admin-message admin-message-error" role="alert">
            {errorMessage}
          </p>
        ) : null}

        {mode === "list" ? (
          <>
            <section className="admin-stats-grid" aria-label="Resumo dos produtos">
              {adminStats.map((stat) => (
                <article className="admin-stat-card" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </section>

            {isLoadingProducts ? (
              <div className="admin-loading">Carregando produtos...</div>
            ) : null}
            <ProductTable
              products={sortedProducts}
              busyProductId={busyProductId}
              onCreate={handleCreate}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggleAvailable={(product) => handleToggle(product, "available")}
              onToggleFeatured={(product) => handleToggle(product, "featured")}
              onToggleNew={(product) => handleToggle(product, "isNew")}
            />
          </>
        ) : (
          <ProductForm
            key={editingProduct?.id ?? mode}
            product={editingProduct}
            isSaving={isSaving}
            onCancel={showList}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}
