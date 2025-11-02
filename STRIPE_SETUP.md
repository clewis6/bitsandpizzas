# Card Payment Setup for Bits & Pizzas

## Overview
The website now supports credit/debit card payments using Stripe. Customers can pay online when placing their order.

## Setup Instructions

### 1. Create a Stripe Account
1. Go to https://stripe.com and sign up
2. Complete your account verification
3. Navigate to the Dashboard

### 2. Get Your API Keys
1. In the Stripe Dashboard, click **Developers** → **API keys**
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

### 3. Add Keys to Your Website

Create a file named `.env.local` in your project root with:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**IMPORTANT:** Never share your secret key publicly!

### 4. Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add both keys as environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Redeploy your site

## Test Mode vs Live Mode

### Test Mode (Recommended to start)
- Use test API keys (`pk_test_` and `sk_test_`)
- Use test card numbers:
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - Use any future expiry date and any 3-digit CVC

### Live Mode (Real payments)
1. Complete Stripe account activation
2. Switch to live API keys (`pk_live_` and `sk_live_`)
3. Update environment variables
4. Real cards will be charged

## How It Works

1. Customer selects "💳 Credit/Debit Card (Pay Now)"
2. Card payment form appears
3. Customer enters card details securely (Stripe handles this)
4. Payment is processed immediately
5. Order is confirmed and sent to kitchen

## Features

- ✅ Secure payment processing (PCI compliant)
- ✅ No card details stored on your server
- ✅ Supports all major cards (Visa, Mastercard, Amex, Discover)
- ✅ Real-time payment confirmation
- ✅ Automatic refund support through Stripe dashboard

## Fees

Stripe charges 2.9% + $0.30 per successful transaction.
Example: $20 order = $20 - ($0.58 + $0.30) = $19.12 received

## Support

- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Support: https://support.stripe.com
- Documentation: https://stripe.com/docs

## Alternative: Keep Cash Only

If you prefer to keep cash/card payments at pickup only:
- Leave the payment method as is
- Customers can still select "card" but it means they'll pay with card at pickup
- No Stripe setup needed
