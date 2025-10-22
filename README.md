# SPIIK Website

The official website for the student organization SPIIK, built with [Next.js](https://nextjs.org), [Payload CMS](https://payloadcms.com), and [TypeScript](https://www.typescriptlang.org).

## About

This is the main website for SPIIK, featuring information about the organization, membership tiers, board members, programs, and housing information.

## Hosting & Accounts

- **GitHub**: Hosted on the [kodkollektivet GitHub account](https://github.com/kodkollektivet)
- **Vercel**: Deployed on [Vercel](https://vercel.com), automatically synced with the GitHub repository

Any push to the main branch automatically triggers a deployment on Vercel.

## Tech Stack

- **Framework**: Next.js with App Router
- **CMS**: Payload CMS
- **Database**: PostgreSQL (local) or Neon (on Vercel)
- **Styling**: Tailwind CSS
- **Linting**: Biome

## Development

### Prerequisites

- Node.js 18+ 
- pnpm
- PostgreSQL

### Quick Start

1. Clone the repository and install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your PostgreSQL connection string to the `.env` file.

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
src/
  app/              # Next.js routes and pages
  collections/      # Payload CMS collections
  components/       # React components
  globals/          # Payload CMS globals
  hooks/            # Custom React hooks
  lib/              # Utility functions
  types/            # TypeScript type definitions
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm ci` - For running migrations and building (used as build cmd on Vercel)

### Other usefull commands

- `pnpm payload migrate:create` - Creates database migration files. Used when updating collections or globals

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
