/**
 * Checkout configuration.
 *
 * CHECKOUT_LIVE  — false shows "Coming soon" on every call to action, with no
 *                  link behind it. Flip to true the day the app is approved.
 * FOUNDERS_OPEN  — while true, every button points at the Founders link and
 *                  reads "Claim Founders pricing". Flip to false on the day the
 *                  fiftieth founder subscribes and the whole site switches to
 *                  Standard, copy included.
 *
 * A server-side counter is the durable version of the Founders cap and belongs
 * in Phase 2. You cross that threshold exactly once, and you will know the day.
 */
export const CHECKOUT_LIVE = false;
export const FOUNDERS_OPEN = true;

export const STRIPE = {
  founders: "https://buy.stripe.com/00wfZh3FAcFhgL15To24004",
  standard: "https://buy.stripe.com/5kQ4gzfoi20D3YfbdI24003",
  viewOnly: "https://buy.stripe.com/eVq6oHb82dJleCT1D824005",
};

export const startUrl = FOUNDERS_OPEN ? STRIPE.founders : STRIPE.standard;
export const startLabel = FOUNDERS_OPEN ? "Claim Founders pricing" : "Start free trial";
