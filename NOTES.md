# Hona site — working notes

Everything you'd need to hand a fresh Claude thread, or your future self, to
change this site without re-deriving any of it.

---

## What this is

The Hona Financial marketing site and utility pages. Astro, plain CSS, no
Tailwind, no component library, no build config beyond the defaults. Deployed
to Vercel. Ten pages plus a 404.

**Why plain CSS:** the site has a strong custom identity and one maintainer.
A utility framework would have added a config file to break and a build step to
debug, for no gain at this size.

---

## Deploying

```bash
cd ~/Development/hona-site
npx vercel --prod
```

That's the whole thing. First run asks you to log in and answer a few setup
questions — accept the defaults, Astro is detected automatically.

Local preview while editing:

```bash
npm run dev          # http://localhost:4321
```

---

## The two switches

`src/config/checkout.ts`. These are the only two things that change on their
own schedule.

```ts
export const CHECKOUT_LIVE = false;   // launch day
export const FOUNDERS_OPEN = true;    // the 50th founder
```

**`CHECKOUT_LIVE`** — while `false`, every call to action reads *Coming soon*,
links nowhere, and can't be clicked. The homepage adds a line saying Hona is in
final testing. Flip to `true` the day the app is approved.

**`FOUNDERS_OPEN`** — while `true`, every button points at the Founders Stripe
link and reads *Claim Founders pricing*. Flip to `false` when the fiftieth
founder subscribes; the whole site switches to Standard, including the pricing
paragraph on the homepage.

Change either, run `npx vercel --prod`, done.

A server-side founder counter is the durable version and belongs with the
Founder 50-cap work in Phase 2. You cross that threshold exactly once and
you'll know the day it happens — a live count on every page load isn't worth
the SSR adapter.

---

## Design system

All of it lives in `:root` at the top of `src/styles/global.css`. Change a
value there and the whole site follows.

| Token | Value | Where it's used |
|---|---|---|
| `--ink` | `#0A0B0D` | Masthead rail — near black, gradient gives it a polished sheen |
| `--charcoal` | `#222B38` | Slate blue. Hero and dark bands, matte |
| `--cream` | `#F7F5F0` | Paper. Body ground and all light text |
| `--cream-deep` | `#EDE9E1` | The "How it works" band |
| `--walnut` | `#4E4A44` | The lender band — grey-brown, faint cool cast |
| `--brass` | `#B8912F` | The only accent. CTA buttons, hairlines, eyebrow text on dark |
| `--maroon` | `#800020` | **Semantic only.** Never decorative |

**Type.** Archivo for display and labels, Source Serif 4 for body prose.
Archivo has a width axis, so the wide-tracked uppercase labels are real
expanded lettering rather than letter-spaced body type — that's why they read
like signage. Serif body was a deliberate choice: ledgers and contracts are set
in serif, and it reads as substantial rather than as another SaaS page.

**The rule that matters:** brass is the only accent, maroon is the only
semantically loaded colour. If something needs emphasis and isn't a warning,
it gets brass or it gets space.

---

## Structure

```
src/
  components/
    Compass.astro     the logo, four draw states as CSS filters
    StateDial.astro   compass + caption + track + the cycling script
    Start.astro       the single call to action, respects CHECKOUT_LIVE
  config/
    checkout.ts       Stripe links and the two switches
  layouts/
    Base.astro        masthead, footer, fonts, meta
  pages/              one file per route
  styles/global.css   palette, type, layout rhythm
public/
  logo/compass.png    the real logo, 900px, transparent
  screens/*.png       app screenshots used in the plates
```

**The compass states** are CSS filters over one image file:

- `st-none` — grayscale, low contrast, 55% opacity
- `st-requested` / `st-pending` — grayscale (the label carries the difference)
- `st-approved` — full colour

`StateDial` cycles them every 2.6 seconds and respects
`prefers-reduced-motion`, which pins it to Approved.

---

## Changing the screenshots

Drop new PNGs into `public/screens/` with the same filenames — `scan.png`,
`ledger.png`, `network.png`. No code change. Portrait, around 780×1700 after
resize. If you add a fourth, copy an existing `<article class="plate">` block
in `src/pages/index.astro` and alternate `plate--flip` so the images zig-zag.

---

## Planned changes, so a future thread has the context

**Home page chart slideshow (Phase 3, September).** Replace the compass dial on
the *homepage* hero with a rotating set of BI chart screenshots — S-curve,
funding gap, category variance. **Keep the compass dial on `/lenders`**, where
the draw-state story is the point.

The dial component is already built to be swapped: `StateDial` is
self-contained, so a `ChartDial` with the same shape drops into the same slot
in `src/pages/index.astro`. Same cycling pattern, same track underneath, just
images instead of filter states.

**Conference attribution (September).** `/start-contractor` and `/start-lender`
as QR destinations, near-identical to the homepage but with a tracking
parameter, so you know which of the three October conferences produced which
signup.

**Web app (Phase 2 at the earliest).** A browser version of Hona itself, not
this site. Hona's navigation is swipe-based, so it's a navigation redesign
rather than a port. Wait until a lender tells you the app download was friction.

---

## Legal pages

`privacy.astro` and `terms.astro` were rewritten, not ported from the old
Framer site. Two things changed materially and should not be quietly reverted:

1. **Deletion** now states that approved draw records are retained with the
   personal identifiers removed, and explains why — a lender released funds
   against them. The old text claimed all data is removed within 30 days,
   which stopped being true when the deletion cascade was built.
2. **Stakeholder access** has its own section describing scoped, revocable,
   free access.

Have a lawyer read both before launch.

---

## App Store Connect

- **Support URL:** `https://honafinancial.com/support`
- **Privacy Policy URL:** `https://honafinancial.com/privacy`

Both are required fields. `/support` exists for this reason as much as for
customers.

---

## Supabase touchpoints

`/reset-password` is where Supabase sends password recovery links. It needs
two things to work:

1. The anon key pasted into `src/pages/reset-password.astro` (Supabase →
   Settings → API). It's the same key already embedded in the app binary —
   safe in a public page.
2. `https://honafinancial.com/reset-password` present in Supabase →
   Authentication → URL Configuration → Redirect URLs.

The page handles all three link formats Supabase might send — `token_hash`,
hash tokens, or a PKCE code — because the native app flow used PKCE and the
browser has no verifier. That's why the in-app version never worked.
