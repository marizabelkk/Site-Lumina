# ✨ Lumina Semi Joias

Site institucional e catálogo online desenvolvido para a **Lumina Semi Joias**, com o objetivo de apresentar os produtos da marca de forma moderna, organizada e responsiva.

O projeto conta com catálogo de produtos, página individual de cada peça, sacolinha de compras, finalização de pedido pelo WhatsApp e uma área administrativa para gerenciamento dos produtos.

## 🖥️ Demonstração
<img width="1904" height="1079" alt="image" src="https://github.com/user-attachments/assets/3b63e4d4-1711-4cea-8b63-e08771cc9da2" />


🌐 **Site:** [acesse o site da Lumina Semi Joias](https://site-lumina.vercel.app/)

📂 **Repositório:** [GitHub](https://github.com/marizabelkk/Site-Lumina)

## 🚀 Tecnologias utilizadas

* **Next.js** — desenvolvimento da aplicação web
* **React** — construção da interface e componentes
* **TypeScript** — tipagem e organização do código
* **Supabase** — banco de dados, autenticação e armazenamento de imagens
* **Tailwind CSS** — estilização da interface
* **Vercel** — hospedagem e deploy
* **Git & GitHub** — versionamento do projeto

## ✨ Funcionalidades

### 🛍️ Catálogo

* Exibição dos produtos disponíveis
* Filtros por categoria e características
* Informações detalhadas sobre cada peça
* Número de referência dos produtos
* Imagens e descrições dos produtos

### 🛒 Sacolinha

* Adição de produtos à sacolinha
* Visualização dos produtos selecionados
* Controle das quantidades
* Finalização do pedido pelo WhatsApp

### 🔐 Área administrativa

* Autenticação de administrador
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Controle de disponibilidade
* Gerenciamento das informações dos produtos

### 📱 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela, proporcionando uma experiência adequada tanto em **computadores quanto em dispositivos móveis**.

## 🗄️ Banco de dados

O projeto utiliza o **Supabase**, baseado em PostgreSQL, para armazenar as informações dos produtos.

Entre os dados armazenados estão:

* ID do produto
* Nome
* Descrição
* Preço
* Disponibilidade
* Variações
* Referência do produto

As imagens dos produtos também são armazenadas utilizando o **Supabase Storage**.

## 🔑 Autenticação

A área administrativa utiliza a autenticação do **Supabase Auth**, permitindo restringir o acesso às funcionalidades de gerenciamento dos produtos.

As credenciais e variáveis de ambiente utilizadas no projeto não são armazenadas no repositório público.

## 📁 Estrutura do projeto

A aplicação é organizada em componentes, páginas e serviços, separando as responsabilidades do sistema e facilitando sua manutenção e evolução.

```text
Site-Lumina/
├── app/
├── components/
├── lib/
├── services/
├── public/
├── types/
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/marizabelkk/Site-Lumina.git
```

### 2. Acesse a pasta

```bash
cd Site-Lumina
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
```

### 5. Execute o projeto

```bash
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

## 📌 Objetivo do projeto

Este projeto foi desenvolvido como uma aplicação real para uma marca de semi joias, buscando unir **design, experiência do usuário e desenvolvimento web**.

Além da construção da interface, o projeto envolveu a criação e integração de um banco de dados, autenticação, armazenamento de imagens, gerenciamento de produtos e integração com o WhatsApp para facilitar o processo de pedido.

Durante o desenvolvimento, também utilizei **agentes de inteligência artificial como ferramenta de apoio**, especialmente o Codex, auxiliando na implementação, revisão e resolução de problemas ao longo do projeto.

## 👩‍💻 Desenvolvido por

**Maria Isabel Mariz de Oliveira**

Estudante de Ciência da Computação e desenvolvedora em formação.

* GitHub: [@marizabelkk](https://github.com/marizabelkk)
