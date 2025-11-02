# Vercel Stripe Environment Variables Setup

## Overview
The website now accepts card-only payments through Stripe. Cash payments have been removed. To make this work in production, you need to add your Stripe API keys to Vercel.

## Steps to Add Stripe Keys to Vercel

### 1. Get Your Stripe API Keys
1. Log in to your Stripe Dashboard: https://dashboard.stripe.com/
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
   - **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

### 2. Add Keys to Vercel
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select the `bitsandpizzas` project
3. Click on "Settings" at the top
4. Click on "Environment Variables" in the left sidebar
5. Add two new variables:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value:** Your Stripe publishable key (e.g., `pk_test_...`)
- **Environment:** Select all (Production, Preview, Development)

**Variable 2:**
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** Your Stripe secret key (e.g., `sk_test_...`)
- **Environment:** Select all (Production, Preview, Development)

6. Click "Save" for each variable

### 3. Redeploy
After adding the environment variables, you need to redeploy:
1. Go to the "Deployments" tab in your Vercel project
2. Click the three dots (...) on your latest deployment
3. Click "Redeploy"
4. OR simply push a new commit to GitHub (Vercel will auto-deploy)

## Test Mode vs Live Mode

### Start with Test Mode (Recommended)
- Use test keys (`pk_test_` and `sk_test_`)
- Test cards won't charge real money
- Use card number: `4242 4242 4242 4242` for testing
- Any future expiration date and any 3-digit CVC

### Switch to Live Mode
When you're ready to accept real payments:
1. In Stripe Dashboard, toggle from "Test mode" to "Live mode" (top right)
2. Get your live keys (`pk_live_` and `sk_live_`)
3. Update the environment variables in Vercel with live keys
4. Redeploy

## Testing the Card Payment

1. Add items to cart on the website
2. Go to checkout
3. Fill in contact information
4. Use a test card:
   - **Card Number:** 4242 4242 4242 4242
   - **Expiration:** Any future date (e.g., 12/25)
   - **CVC:** Any 3 digits (e.g., 123)
   - **ZIP:** Any 5 digits (e.g., 12345)
5. Click "Pay $XX.XX"
6. Order should be submitted successfully

## Stripe Fees

### Standard Pricing
- **2.9% + $0.30** per successful card charge
- Example: $20 order = $0.88 fee (you receive $19.12)

### What Happens in Test Mode
- No actual charges or fees
- All transactions are simulated
- Perfect for testing before going live

## Current Status

✅ Stripe integration complete
✅ Card payment form implemented
✅ Cash option removed (card-only payments)
✅ Payment intent API endpoint created
✅ Test keys configured in code
⚠️ Production keys need to be added to Vercel
⚠️ Need to redeploy after adding keys

## Support

For questions about Stripe setup:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com/

For questions about the website:
- Call (928) 536-4005
