
# 🎌 AnimeHub

**AnimeHub** é uma aplicação web moderna para **descoberta, exploração e favoritação de animes**, construída com foco em **UX**, **performance** e **boas práticas de engenharia frontend**.

O projeto consome dados públicos da **Jikan API (MyAnimeList)** e foi desenvolvido como parte de uma iniciativa pessoal de evolução técnica e construção de portfólio profissional.

---


## ✨ Funcionalidades

* 🔍 **Busca de animes** com debounce
* ⭐ **Sistema de favoritos persistido no navegador**
* 📄 **Página de detalhes** com sinopse, score, status e metadata
* 🎨 **UI moderna** com glassmorphism, hover states e layout responsivo
* ⚡ **Performance otimizada** com Server Components e caching
* 🧩 **Arquitetura modular e tipada**

---

## 🧠 Decisões de Arquitetura

* **Next.js App Router** para aproveitar:

  * Server Components
  * Streaming
  * SEO nativo
* **Separação clara de responsabilidades**:

  * `lib/` → acesso a API, helpers e erros
  * `components/` → UI reutilizável
  * `app/` → rotas e páginas
* **Gerenciamento de estado simples**, sem overengineering
* **Favoritos armazenados via `localStorage`**, desacoplados de UI

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js 14 (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **API:** Jikan (MyAnimeList)
* **Lint & Qualidade:** ESLint + TypeScript strict
* **CI:** GitHub Actions (lint, typecheck, build)

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── anime/
│   │   └── [id]/page.tsx
│   ├── favorites/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AnimeCard.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── jikan.ts
│   ├── favorites.ts
│   └── utils.ts
└── styles/
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

* Node.js 18+

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## ⚠️ Limitações Conhecidas

* A **Jikan API possui rate limit** (pode retornar 429 em uso intensivo)
* Favoritos são locais (não há backend ou autenticação)
* Não há paginação avançada (por enquanto)

---

## 🗺️ Roadmap

* [ ] Modo Dark / Light
* [ ] Skeleton loaders mais avançados
* [ ] Paginação infinita
* [ ] Animações com Framer Motion
* [ ] Autenticação (NextAuth)
* [ ] Backend próprio para favoritos

---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`feature/nome-da-feature`)
3. Commit suas alterações
4. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
Sinta-se à vontade para usar, estudar e adaptar.


