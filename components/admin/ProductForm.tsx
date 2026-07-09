"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { uploadProductImage } from "@/services/productService";
import type { Product, ProductFormData } from "@/types/product";

type ProductFormProps = {
  product?: Product | null;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (product: ProductFormData) => Promise<void>;
};

const emptyProduct: ProductFormData = {
  reference: "",
  name: "",
  description: "",
  price: 0,
  category: "",
  image: "",
  isNew: false,
  available: true,
  featured: false,
};

function getInitialProduct(product?: Product | null): ProductFormData {
  if (!product) {
    return emptyProduct;
  }

  return {
    reference: product.reference ?? "",
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    isNew: Boolean(product.isNew),
    available: product.available,
    featured: Boolean(product.featured),
  };
}

export function ProductForm({
  product,
  isSaving,
  onCancel,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(() =>
    getInitialProduct(product),
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const imagePreview = previewUrl || formData.image;
  const actionLabel = product ? "Salvar alteracoes" : "Cadastrar produto";
  const isSubmitting = isSaving || isUploading;

  function updateField<Key extends keyof ProductFormData>(
    field: Key,
    value: ProductFormData[Key],
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.category.trim()) {
      setErrorMessage("Preencha pelo menos nome e categoria do produto.");
      return;
    }

    if (!Number.isFinite(formData.price) || formData.price < 0) {
      setErrorMessage("Informe um preco valido.");
      return;
    }

    if (!formData.image && !selectedImage) {
      setErrorMessage("Selecione uma imagem do produto.");
      return;
    }

    try {
      let imageUrl = formData.image;

      if (selectedImage) {
        setIsUploading(true);
        imageUrl = await uploadProductImage(selectedImage);
      }

      await onSubmit({ ...formData, image: imageUrl });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel salvar o produto.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div className="admin-form-head">
        <div>
          <p className="admin-eyebrow">{product ? "Editar" : "Novo produto"}</p>
          <h2>{product ? product.name : "Cadastrar produto"}</h2>
        </div>
        <button className="admin-ghost-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>

      {errorMessage ? (
        <p className="admin-message admin-message-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="admin-form-layout">
        <section className="admin-form-card">
          <h3>Dados do produto</h3>
          <div className="admin-form-grid">
            <label>
              Referencia
              <input
                type="text"
                value={formData.reference}
                onChange={(event) => updateField("reference", event.target.value)}
              />
            </label>

            <label>
              Nome
              <input
                required
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>

            <label>
              Preco
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(event) => updateField("price", Number(event.target.value))}
              />
            </label>

            <label>
              Categoria
              <input
                required
                type="text"
                value={formData.category}
                onChange={(event) => updateField("category", event.target.value)}
              />
            </label>

            <label className="admin-form-wide">
              Descricao
              <textarea
                rows={4}
                value={formData.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </label>
          </div>
        </section>

        <aside className="admin-form-card admin-side-card">
          <h3>Imagem e status</h3>
          <label className="admin-file-field">
            Imagem
            <input
              type="file"
              accept="image/*"
              required={!formData.image}
              onChange={handleImageChange}
            />
          </label>

          <div className={`admin-image-preview ${imagePreview ? "" : "is-empty"}`}>
            {imagePreview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Previa do produto" />
                <span>{selectedImage ? "Nova imagem selecionada" : "Imagem atual"}</span>
              </>
            ) : (
              <span>Nenhuma imagem selecionada</span>
            )}
          </div>

          <div className="admin-switch-row">
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(event) => updateField("isNew", event.target.checked)}
              />
              <span>Novo</span>
            </label>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(event) => updateField("available", event.target.checked)}
              />
              <span>Disponivel</span>
            </label>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(event) => updateField("featured", event.target.checked)}
              />
              <span>Destaque</span>
            </label>
          </div>
        </aside>
      </div>

      <button className="primary-button admin-submit-button" disabled={isSubmitting}>
        {isUploading ? "Enviando imagem..." : actionLabel}
      </button>
    </form>
  );
}
