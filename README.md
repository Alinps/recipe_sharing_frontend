# MasterChef Frontend

A React + Vite frontend for a recipe sharing platform where users can discover, create, save, and manage recipes.

## Features

- Server wake-up screen with health-check before app entry
- Authentication (register, login, logout) with token persistence
- Public and protected routes
- Recipe listing with search, infinite scroll, and skeleton loading
- Recipe details with wishlist toggle and owner actions (edit/delete)
- Create and edit recipes with image upload support
- Profile page with personal recipes and wishlist tab
- Profile edit and password change flows
- Global toast notifications for user feedback

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Redux Toolkit + React Redux
- Axios
- CSS Modules

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000/
```

Use your backend base URL as needed.

### 3. Run locally

```bash
npm run dev
```

App starts at the local Vite development URL (usually `http://localhost:5173`).

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```text
src/
  components/   # Reusable UI and route guards
  context/      # Toast context provider
  pages/        # Route-level pages
  services/     # API client configuration
  store/        # Redux store and auth slice
```

## Notes

- API requests use `VITE_API_URL` from environment variables.
- Auth token is stored in `localStorage` and sent as `Authorization: Token <token>` for protected requests.
