# Portfolio

A responsive portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion. Page content is loaded from published Google Sheets; contact form submissions are delivered through Telegram.

## Requirements

- Node.js 20.9 or newer
- npm

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Deploy `docs/contact-form-apps-script.gs` as a Google Apps Script web app, then set its `/exec` URL as `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in `.env.local`. Store the Telegram bot token and chat ID in Apps Script Properties; never expose them as `NEXT_PUBLIC_*` values.

## Commands

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
```

## Structure

- `app/` — routes, root layout and global styles
- `components/` — shared UI (`Header`, `Footer`, `CTASection`, …), `animations/` and `icons/`
- `contexts/` — global loading state that hides the header and footer while a page loads
- `hooks/` — `usePageData` (page data loading) and `useAudience` (recruiter vs client context)
- `lib/` — Google Sheets fetching, content mappers and small helpers
- `public/` — static images

The default `/` route is the recruiter portfolio. The freelance client portfolio lives at `/client`, with its supporting pages at `/services`, `/work` and `/about`. `/blog` and `/contact` are shared, and keep the visitor's audience through the `?audience=` / `?source=` query and session storage.

## Content

Page content comes from a published Google Spreadsheet. Tab GIDs are configured in `lib/googleSheets.ts` and the expected columns for each tab are defined by the mappers in `lib/sheetsMappers.ts`. After editing the spreadsheet, publish it again (File → Share → Publish to web).

Sheet responses are cached for ten minutes in memory and browser local storage. Pass `{ forceRefresh: true }` to `fetchSheetDataByName` when an explicit refresh is required.

Recruiter content uses the six `recruiter_*` tabs, and every one must contain data or the recruiter page stays on its loading screen. In list columns such as `bullets`, `technologies`, `tags` and `company_marquee`, separate items with semicolons.

## Deployment

GitHub Actions builds and deploys the static export to GitHub Pages on every push to `main` and every 15 minutes so published Google Sheets changes are picked up automatically. The workflow is defined in `.github/workflows/deploy-pages.yml`.

The contact form uses the Google Apps Script source in `docs/contact-form-apps-script.gs`. GitHub Actions reads its deployed URL from the `CONTACT_FORM_ENDPOINT` repository variable. The same URL works in `.env.local`, so local development and GitHub Pages use identical submission behavior while Telegram credentials remain private in Apps Script Properties.
