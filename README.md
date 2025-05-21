# NASC Template

A NextJs Atomic styled-components template. Provides a base package with an atomic structure utilizing styled-components.
styled-components is setup to work with a full SSR app.

### Reverting to Next.js' hybrid SSR/SPA functionality <!-- markdownlint-disable-line MD001 -->

Remove the _document.tsx file in src/app/ and uncomment `'use client'` in
src/ui/atoms/HelloWorld.tsx.

## Getting Started

This is configured to use Yarn, but if you're using npm instead, simply delete the .pnp.* files, .yarn folder, and the yarn.lock file.

1. Run `$yarn install`.
2. Now you can run `$yarn dev`.
3. Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### TGest

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
