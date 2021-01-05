import Stripe from 'stripe';
// from https://stripe.com/ to get the secret Key
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2020-03-02',
});
