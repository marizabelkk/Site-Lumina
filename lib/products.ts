import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "brinco-gota-delicada",
    name: "Brinco Gota Delicada",
    description: "Brinco delicado com gota cravejada para iluminar produções especiais.",
    price: 129.9,
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=82",
    category: "Brincos",
    available: true,
    isNew: true,
    featured: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "colar-ponto-de-luz",
    name: "Colar Ponto de Luz",
    description: "Colar clássico com ponto de luz para usar sozinho ou em composição.",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=82",
    category: "Colares",
    available: true,
    featured: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "pulseira-zirconias",
    name: "Pulseira Zircônias",
    description: "Pulseira dourada com zircônias discretas e acabamento sofisticado.",
    price: 149.9,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=82",
    category: "Pulseiras",
    available: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "anel-duplo-brilho",
    name: "Anel Duplo Brilho",
    description: "Anel duplo com brilho central para um toque elegante no dia a dia.",
    price: 99.9,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=82",
    category: "Anéis",
    available: true,
    isNew: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "argola-cravejada",
    name: "Argola Cravejada",
    description: "Argola leve com detalhes cravejados e presença delicada.",
    price: 139.9,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=82",
    category: "Brincos",
    available: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "colar-concha",
    name: "Colar Concha",
    description: "Pingente de concha com banho dourado e inspiração solar.",
    price: 129.9,
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=700&q=82",
    category: "Colares",
    available: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "brinco-perola",
    name: "Brinco Pérola",
    description: "Brinco com pérola sintética e banho nobre para composições atemporais.",
    price: 109.9,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=82",
    category: "Brincos",
    available: true,
    material: "Ouro 18k",
    color: "Pérola",
  },
  {
    id: "pulseira-coracao",
    name: "Pulseira Coração",
    description: "Pulseira com pingente de coração para presentear com significado.",
    price: 129.9,
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=700&q=82",
    category: "Pulseiras",
    available: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "conjunto-coracao",
    name: "Conjunto Coração",
    description: "Conjunto com colar e brincos de coração para ocasiões especiais.",
    price: 199.9,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=82",
    category: "Conjuntos",
    available: true,
    isNew: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "colar-esmeralda",
    name: "Colar Esmeralda",
    description: "Colar com pedra verde em destaque e banho dourado sofisticado.",
    price: 139.9,
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=700&q=82",
    category: "Colares",
    available: true,
    material: "Ouro 18k",
    color: "Verde",
  },
  {
    id: "anel-trancado",
    name: "Anel Trançado",
    description: "Anel trançado com textura elegante e acabamento delicado.",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1603561596112-db1d7d5c8c10?auto=format&fit=crop&w=700&q=82",
    category: "Anéis",
    available: true,
    material: "Ouro 18k",
    color: "Dourado",
  },
  {
    id: "brinco-retangulo",
    name: "Brinco Retângulo",
    description: "Brinco retangular com pedra clara e visual moderno.",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=82",
    category: "Brincos",
    available: false,
    material: "Ródio Branco",
    color: "Prata",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getInstallmentText(value: number) {
  return `ou 3x de ${formatCurrency(value / 3)}`;
}
