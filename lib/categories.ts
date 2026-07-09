export type Category = {
  name: string;
  imageUrl: string;
  alt: string;
  badge?: string;
};

export const categories: Category[] = [
  {
    name: "Brincos",
    imageUrl:
      "/produtos/brincos.jpg",
    alt: "Brincos dourados sobre tecido claro",
  },
  {
    name: "Colares",
    imageUrl:
      "/produtos/colares.jpg",
    alt: "Colares delicados usados em composição elegante",
  },
  {
    name: "Pulseiras",
    imageUrl:
      "/produtos/pulseiras.jpg",
    alt: "Pulseiras douradas com brilho suave",
  },
  {
    name: "Anéis",
    imageUrl:
      "/produtos/aneis.jpg",
    alt: "Anéis dourados em fundo sofisticado",
  },
  {
    name: "Conjuntos",
    imageUrl:
      "/produtos/conjuntos.jpg",
    alt: "Conjunto de semijoias douradas",
  },
  {
    name: "Lançamentos",
    imageUrl:
      "/produtos/lançamentos.jpg",
    alt: "Pingente dourado em tecido creme",
    badge: "Novo",
  },
];
