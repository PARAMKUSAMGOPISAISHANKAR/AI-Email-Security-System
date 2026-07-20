# SpamShieldAI — Email Spam Detection Dashboard (Frontend)

A modern, fully responsive **frontend-only** Email Spam Detection web application, built to be dropped in front of a Django/Flask backend later. All data (users, history, stats, analysis results) is currently mocked in `src/services/mockApi.ts` — swap that file for real API calls when your backend is ready.

## Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (CSS-based theme tokens, no config file needed)
- **Framer Motion** for animation
- **Recharts** for analytics charts
- **lucide-react** for icons
- **React Router v7** for routing

## Design

- Palette: indigo/blue -> violet gradient ("signal" + "violet" tokens) on a soft blue-white background, with dedicated spam (red), safe (green), and warning (amber) semantic colors.
- Typography: **Space Grotesk** for display/headings, **Inter** for body text.
- Signature motif: an animated "scan line" sweep (used in the hero illustration and loading state) that echoes the product's core action — scanning an email for spam signals.
- Full light/dark mode via a `dark` class on `<html>`, toggleable from the navbar, topbar, or Profile page, and persisted to `localStorage`.
- Glassmorphism cards (`.glass` utility), soft grid background (`.bg-grid`), rounded-2xl/3xl surfaces throughout.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Folder structure

```
src/
  components/
    ui/            Button, Modal, LoadingSpinner/Skeleton
    layout/        Navbar, Sidebar, AppTopbar, Footer
    dashboard/     StatCard, EmailForm, PredictionCard, HistoryTable
    charts/        SpamTrendChart, MonthlyBarChart, SpamPieChart (Recharts)
  layouts/         PublicLayout, AuthLayout, DashboardLayout
  pages/           Landing, Login, Register, Dashboard, Detect,
                    HistoryPage, Analytics, Profile, NotFound
  hooks/           useTheme (dark mode), useToast (notifications)
  services/        mockApi.ts — dummy data + fake analysis engine
  types/           shared TypeScript interfaces
```

## Pages

| Route         | Description                                                |
|---------------|-------------------------------------------------------------|
| `/`           | Landing page — hero, features, how it works, CTA            |
| `/login`      | Login (email, password, remember me, Google button)         |
| `/register`   | Register (name, email, password, confirm password)          |
| `/dashboard`  | Stat cards + weekly trend + recent detections                |
| `/detect`     | Paste/upload email -> animated analysis -> prediction card   |
| `/history`    | Searchable, filterable, paginated detection history table    |
| `/analytics`  | Trend area chart, monthly bar chart, spam/safe pie chart      |
| `/profile`    | Account details, notification & theme settings                |

## Connecting a real backend

Everything the UI needs is centralized in `src/services/mockApi.ts`:

- `analyzeEmail(content)` -> replace with a `POST /api/analyze` call returning a `DetectionResult`.
- `historyData` -> replace with `GET /api/history`.
- `mockStats`, `spamTrend`, `monthlyReports`, `distribution` -> replace with your analytics endpoints.
- `mockUser` -> replace with your auth/session user.
- Login/Register `setTimeout` calls in `src/pages/Login.tsx` / `Register.tsx` -> replace with real auth requests.

The `DetectionResult`, `HistoryItem`, `DashboardStats`, `TrendPoint`, `MonthlyReport`, and `User` types in `src/types/index.ts` describe the exact shape the UI expects, so you can match your backend's response format to them.
