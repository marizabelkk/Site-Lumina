export type Product = {
  id: string;
  reference?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  isNew?: boolean;
  featured?: boolean;
  createdAt?: string;
  material?: string;
  color?: string;
};

export type ProductFormData = {
  reference: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  available: boolean;
  featured: boolean;
};
