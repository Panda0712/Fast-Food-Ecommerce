# Fast Food Ecommerce 🍔🍟🍕

A Next.js based fast-food ecommerce — browse foods, add to cart, checkout with example payment integrations (Momo, ZaloPay). This repository contains the frontend app (Next.js, App Router).

## Overview

This project demonstrates a complete fast-food ordering flow: product browsing, search and categories, shopping cart, shipping/checkout, payment integration, and order history. It's built with Next.js (App Router) and Tailwind CSS.

## Demo

<img src="public/fast-food-demo-first.gif" width="840" alt="Demo GIF 1">
<br>
<img src="public/fast-food-demo-2.gif" width="840" alt="Demo GIF 2">
<br>
<img src="public/fast-food-demo-3.gif" width="840" alt="Demo GIF 3">
<br>
<img src="public/fast-food-demo-4.gif" width="840" alt="Demo GIF 4">

## Key Features

- **Browse foods** by categories and search.
- **List recommendation foods** using **rating-based**, **content-based** and content-based with user data **recommendation system** written in Python
- **Cart & checkout** with shipping details and order summary.
- **Example payment integrations:** Momo and ZaloPay sample servers for testing redirect/callback flows.
- **Order** history and success pages.
- **Authentication** pages using Clerk.
- **Reusable UI components** and utility functions.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)&nbsp;![React](https://img.shields.io/badge/React-18-blue?logo=react)&nbsp;![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-skyblue?logo=tailwindcss)&nbsp;![Axios](https://img.shields.io/badge/Axios-1.x-0052CC?logo=axios)&nbsp;![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios for HTTP requests
- Supabase

## Environment Variables

Create a `.env.local` file in the project root and add the keys your local setup requires. Common variables used by the project (add or remove as needed):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key of Clerk
- `CLERK_SECRET_KEY` - Secret key of Clerk
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Sign in url
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Sign up url
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_KEY` — Supabase integration
- `ZALOPAY_SANDBOX_APP_ID` - Sandbox app id
- `ZALOPAY_SANDBOX_KEY1` - Key1 for zalopay sandbox
- `ZALOPAY_SANDBOX_KEY2` - Key2 for zalopay sandbox
- `ZALOPAY_CALLBACK_URL` - Callback payment url for zalopay

Keep secrets out of version control.

## Local Development

Install dependencies and run the Next.js dev server from the project root:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the app.

## Build & Production Preview

Build and start the production server:

```powershell
npm run build
npm run start
```

Or use `npm run preview` if present in your environment for a production preview.

## Troubleshooting

- Ensure you are running Node 18+ (recommended for Next.js 14).
- If pages fail to load, check `.env.local` and required keys.

## Contributing

- Fork the repo and open a PR with your changes.
- Keep components modular in `app/_components/` and keep environment-sensitive values in `.env` files.

## License

Add a `LICENSE` file to declare a license (MIT recommended if you want permissive usage).
