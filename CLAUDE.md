# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

No test suite configured.

## What Preplo Does

KI-gestütztes Verkaufs-Briefing-Tool für den deutschen Bürofachhandel. Nutzer geben einen Firmennamen ein, die App generiert via Claude + Web-Search ein strukturiertes Briefing (Gesprächseinstiege, Wachstumssignale, Firmenprofil, News). Sprache der gesamten UI und aller KI-Outputs: Deutsch.

Pläne: Free (3 Briefings/Monat), Pro (€29/Monat, PDF-Export), Team (€79/Monat, 5 User).

## Stack

- **Next.js 15** App Router, React 19, TypeScript, Tailwind CSS
- **Supabase** — Auth (email/password, Magic Link, Google OAuth) + Datenbank
- **Anthropic SDK** — `claude-sonnet-4-5` mit `web_search_20250305` Tool
- **Stripe** — Subscription billing

## Architecture

### Auth Pattern in API Routes

API routes erzeugen keinen zentralen Auth-Client via Middleware. Stattdessen wird bei jedem Route Handler ein Supabase-Client mit weitergeleiteten Cookies erstellt:

```ts
const supabase = createClient(url, anonKey, {
  global: { headers: { Cookie: request.headers.get('cookie') ?? '' } }
})
```

Für Admin-Operationen (Schreiben, User-Verwaltung) immer `supabaseAdmin` aus `lib/supabase-admin.ts` (Service Role Key).

### Briefing Flow

1. POST `/api/briefing` — prüft Freemium-Limit (nur bei eingeloggten `free`-Usern, max 3/Monat via `usage`-Tabelle)
2. Anthropic-Call mit `web_search` Tool → erwartet reines JSON gemäß `SYSTEM_PROMPT` in `lib/anthropic.ts`
3. JSON wird aus Antwort extrahiert (Markdown-Codeblöcke werden gestripped), in `briefings`-Tabelle gespeichert
4. Anonyme Nutzung erlaubt (`user_id` kann `null` sein), kein Usage-Tracking ohne Login

### Supabase Schema

| Tabelle | Felder |
|---------|--------|
| `profiles` | `id`, `email`, `plan` (free/pro/team), `stripe_customer_id` |
| `briefings` | `id`, `user_id` (nullable), `company_name`, `company_url`, `output` (JSONB) |
| `usage` | `user_id`, `month` (YYYY-MM), `count` |

Cascading Delete: `profiles` löschen entfernt automatisch `briefings` + `usage`.

### Stripe Webhook

`/api/stripe/webhook` — mappt `customer.subscription.*`-Events auf `profiles.plan`. Plan-Mapping via `NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID` (alles andere → `pro`).

### Routing

- `app/(auth)/` — Login/Register (Route Group, kein eigenes Layout)
- `app/auth/confirm/` — OAuth Code Exchange (`supabase.auth.exchangeCodeForSession`)
- `app/briefing/[id]/` — Server Component, lädt Briefing via Service Role Key
- `components/OAuthHandler.tsx` — Client Component im Root Layout, verarbeitet OAuth-Redirects

## Required Environment Variables

```
ANTHROPIC_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID
NEXT_PUBLIC_APP_URL
```
