# 🛍️ Shopping Cart App

A fully responsive, single-page eCommerce web application built with **React**, **Redux Toolkit**, and **TanStack Query**, featuring smooth animations, elegant UI, and a clean code architecture.  
Products are fetched dynamically from the **Fake Store API**, and users can browse, add to cart, and manage items.

---

## Live Demo

🔗 **Live Site:** [Visit the deployed app on Netlify](https://shopppease.netlify.app/)

---

##  Features

-  **State Management** — Redux Toolkit for global cart and authentication state.
-  **Data Fetching** — TanStack Query for performant and cached API interactions.
-  **Styling** — Tailwind CSS for modern and responsive design.
-  **Animations** — Smooth motion effects using GSAP and Framer Motion.
-  **Cart Functionality**
      - Add, remove, and adjust product quantities.
      - Persistent cart per user (stored locally).
-  **Authentication Simulation**
  - Mock signup/login flow (localStorage-based).
-  **Client-Side Routing** — React Router for navigation between pages.
-  **Optimized Loading UI** — Skeleton components for improved UX during data fetching.
-  **Code Quality** — Managed using Biome for linting and formatting consistency.

---

## Tech Stack

| Category            | Technology/Library                    |
|---------------------|---------------------------------------|
| Framework           | React 19                              |
| State Management    | Redux Toolkit                         |
| Data Fetching       | TanStack Query                        |
| Styling             | Tailwind CSS v4                         |
| Animations          | Framer Motion, GSAP                   |
| Linting & Formatting| Biome                                 |
| Icons               | React Icons                           |
| Routing             | React Router                          |
| API                 | Fake Store API                        |
| Hosting             | Netlify                               |

---

## Project Structure

```
src/
├── components/        # Reusable UI components
├── features/          # Redux slices (auth and cart)
├── pages/             # App pages (Home, Shop, Cart, Login, Signup)
├── utils/             # Helper functions and constants
├── styles/            # Global CSS and theme configuration
└── App.jsx            # Main app entry point
```

---

## ⚙️ Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shopping-app.git
cd shopping-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview the production build
```bash
npm run preview
```

---

## Deployment on Netlify

This app is deployed as a **Single Page Application (SPA)**.  
To ensure proper routing for client-side navigation:

1. Create a file at the root of your build output (e.g., `/dist/_redirects`)
2. Add the following line:
   ```
   /*    /index.html   200
   ```
3. Deploy your project to Netlify — routes will now work correctly on refresh.

---

## Key Learnings

- Leveraging **Redux Toolkit** with slices for clean and scalable state logic.
- Using **TanStack Query** for automatic caching and background updates.
- Combining **Framer Motion** and **GSAP** for advanced motion design.
- Applying **Tailwind CSS** design tokens for consistent theming.
- Managing **local persistence** (auth and cart) effectively.

---

## License

This project is open-source under the **MIT License**.

---


**Zahra** — Web Developer  
 Email: zahrabatenin@gmail.com


