# Hona Financial — website

Astro, plain CSS, no build config to break. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
```

## Deploy

```bash
npx vercel --prod
```

Then point `honafinancial.com` at the Vercel project in your domain settings.

## Before it goes live

1. **`src/pages/reset-password.astro`** — replace `PASTE_YOUR_ANON_KEY_HERE`
   with the anon key from Supabase → Settings → API. It's the same key already
   embedded in the app binary; safe in a public page.

2. Confirm `https://honafinancial.com/reset-password` is in
   Supabase → Authentication → URL Configuration → Redirect URLs.

3. Swap the screenshots in `public/screens/` when you have cleaner ones from
   the final build. Same filenames, no code change needed.

## Two switches

Everything to do with checkout lives in `src/config/checkout.ts`.

```ts
export const CHECKOUT_LIVE = false;   // launch day
export const FOUNDERS_OPEN = true;    // the 50th founder
```

**`CHECKOUT_LIVE = false`** — every call to action on the site reads
*Coming soon* and links nowhere. The homepage adds one line explaining that
Hona is in final testing. Flip to `true` on the day the app is approved.

**`FOUNDERS_OPEN = true`** — every button points at the Founders link and
reads *Claim Founders pricing*. Flip to `false` when the fiftieth founder
subscribes and the whole site switches to Standard, copy included.

Change either, `npx vercel --prod`, done. A server-side founder counter is
the durable version and belongs in Phase 2 — you cross that threshold once
and you'll know the day.

The View Only link is attached to `/checkout/cancel` as a save offer, and
respects `CHECKOUT_LIVE` too.

## Pages

`/` · `/lenders` · `/support` · `/privacy` · `/terms` ·
`/reset-password` · `/email-confirmed` · `/subscription-confirmed` ·
`/delete-account` · `/checkout/success` · `/checkout/cancel` · `404`

App Store Connect requires a **Support URL** and a **Privacy Policy URL**.
Use `https://honafinancial.com/support` and `https://honafinancial.com/privacy`.

The legal pages were rewritten, not ported. Two things changed materially:
deletion now states that approved draw records are retained with identity
removed, and a stakeholder access section was added. Have a lawyer read them
before launch.

## Structure

```
src/
  components/Compass.astro   the mark; four draw states as CSS classes
  layouts/Base.astro         masthead, footer, fonts, meta
  pages/                     one file per route
  styles/global.css          palette, type scale, layout rhythm
```

Colour and type live in `:root` in `global.css`. Change them there and the
whole site follows.
