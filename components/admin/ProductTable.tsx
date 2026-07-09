"use client";

import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
  busyProductId?: string;
  onCreate: () => void;
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
  onToggleAvailable: (product: Product) => void;
  onToggleFeatured: (product: Product) => void;
  onToggleNew: (product: Product) => void;
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function ProductFlag({
  active,
  label,
  inactiveLabel,
  onClick,
  disabled,
}: {
  active: boolean;
  label: string;
  inactiveLabel?: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className={`admin-flag ${active ? "is-active" : ""}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {active ? label : (inactiveLabel ?? label)}
    </button>
  );
}

export function ProductTable({
  products,
  busyProductId,
  onCreate,
  onDelete,
  onEdit,
  onToggleAvailable,
  onToggleFeatured,
  onToggleNew,
}: ProductTableProps) {
  return (
    <section className="admin-table-panel">
      <div className="admin-table-head">
        <div>
          <p className="admin-eyebrow">Produtos</p>
          <h2>Catalogo da loja</h2>
        </div>
        <button className="primary-button admin-new-button" type="button" onClick={onCreate}>
          Novo produto
        </button>
      </div>

      <div className="admin-table-scroll">
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preco</th>
              <th>Status</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isBusy = busyProductId === product.id;

              return (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt="" />
                      ) : (
                        <span className="admin-product-placeholder" />
                      )}
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.reference || "Sem referencia"}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-category-pill">{product.category}</span>
                  </td>
                  <td className="admin-price-cell">{formatCurrency(product.price)}</td>
                  <td>
                    <div className="admin-flag-group">
                      <ProductFlag
                        active={product.available}
                        disabled={isBusy}
                        label="Disponivel"
                        inactiveLabel="Inativo"
                        onClick={() => onToggleAvailable(product)}
                      />
                      <ProductFlag
                        active={Boolean(product.featured)}
                        disabled={isBusy}
                        label="Destaque"
                        inactiveLabel="Sem destaque"
                        onClick={() => onToggleFeatured(product)}
                      />
                      <ProductFlag
                        active={Boolean(product.isNew)}
                        disabled={isBusy}
                        label="Novo"
                        inactiveLabel="Colecao"
                        onClick={() => onToggleNew(product)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="admin-action-row">
                      <button
                        className="admin-edit-button"
                        type="button"
                        onClick={() => onEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="admin-danger-button"
                        type="button"
                        disabled={isBusy}
                        onClick={() => onDelete(product)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!products.length ? (
        <div className="admin-empty-state">
          Nenhum produto cadastrado ainda.
        </div>
      ) : null}
    </section>
  );
}
