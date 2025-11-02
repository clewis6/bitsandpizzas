# Backend Order Tracking System

## 🎯 Overview
This system tracks orders in real-time and automatically detects peak hours to adjust pickup time estimates.

## 📁 Files Added

### 1. API Route: `/src/app/api/orders/route.ts`
- **GET**: Fetch orders (supports `?hours=1` to get recent orders)
- **POST**: Create new order
- **PATCH**: Update order status
- **Returns**: Order count and peak status

### 2. Custom Hook: `/src/app/hooks/usePeakHours.ts`
- Checks order volume every 5 minutes
- Returns:
  - `isPeak`: boolean (true if >10 orders in last hour)
  - `orderCount`: number of recent orders
  - `estimatedTime`: "20-30 minutes" or "40-45 minutes"
  - `loading`: boolean

### 3. Updated Checkout: `/src/app/checkout/page.tsx`
- Submits orders to API
- Shows dynamic pickup times based on peak status
- Displays "🔥 We're busy!" warning during peak hours

## ⚙️ How It Works

### Peak Detection Logic
```javascript
// If more than 10 orders in the last hour = Peak Hours
isPeak = recentOrders.length > 10
```

### Automatic Time Updates
- **Normal Hours**: 20-30 minutes
- **Peak Hours**: 40-45 minutes
- Updates every 5 minutes automatically

### Order Flow
1. Customer places order on checkout page
2. Order sent to `/api/orders` (POST)
3. System counts recent orders
4. Peak status calculated (>10 orders/hour = peak)
5. Checkout page shows updated time estimate
6. Admin dashboard displays all orders

## 📊 Admin Dashboard Features
- View all pending orders
- Update order status (Received → In Progress → Ready → Completed)
- Real-time stats showing order counts
- Auto-refreshes every 5 seconds

## ⚠️ Current Limitation: In-Memory Storage

**The current setup uses in-memory storage**, which means:
- ✅ Perfect for testing and demo
- ✅ No database costs
- ❌ Orders reset when server restarts
- ❌ Not suitable for production

## 🚀 Upgrade to Permanent Database

### Option 1: Vercel KV (Redis) - **RECOMMENDED**
**Cost**: Free tier (30,000 commands/month)

1. Install package:
\`\`\`bash
npm install @vercel/kv
\`\`\`

2. Go to Vercel Dashboard → Storage → Create KV Database

3. Update `/src/app/api/orders/route.ts`:
\`\`\`typescript
import { kv } from '@vercel/kv';

// Replace orders array with:
async function getOrders() {
  return await kv.get('orders') || [];
}

async function addOrder(order) {
  const orders = await getOrders();
  orders.push(order);
  await kv.set('orders', orders);
}
\`\`\`

### Option 2: Vercel Postgres
**Cost**: Free tier (256MB storage)

1. Install:
\`\`\`bash
npm install @vercel/postgres
\`\`\`

2. Create tables and queries in your API routes

### Option 3: Supabase (Free tier)
**Cost**: Free (500MB database, 50,000 monthly users)

1. Create account at supabase.com
2. Install:
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

3. Add environment variables and connect

## 🔧 Testing the System

1. **Place test orders**:
   - Add items to cart
   - Go to checkout
   - Fill out form and submit
   - Note the pickup time estimate

2. **Trigger peak mode**:
   - Place 11+ orders within an hour
   - Refresh checkout page
   - Time should change to "40-45 minutes"
   - Should see "🔥 We're busy!" message

3. **View in admin**:
   - Go to `/admin`
   - See all orders listed
   - Update order statuses
   - Watch counts update

## 📱 API Endpoints

### GET /api/orders
\`\`\`bash
# Get all orders
curl http://localhost:3000/api/orders

# Get orders from last hour
curl http://localhost:3000/api/orders?hours=1
\`\`\`

### POST /api/orders
\`\`\`bash
curl -X POST http://localhost:3000/api/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerName": "John Doe",
    "customerPhone": "555-1234",
    "items": [{"name": "Pepperoni Pizza", "price": 15.99}],
    "total": 15.99
  }'
\`\`\`

### PATCH /api/orders
\`\`\`bash
curl -X PATCH http://localhost:3000/api/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "orderId": "ORD-1234567890",
    "status": "ready"
  }'
\`\`\`

## 🎨 Customization

### Adjust Peak Threshold
In `/src/app/api/orders/route.ts`:
\`\`\`typescript
// Change from 10 to your preferred number
isPeak: recentOrders.length > 10  // ← Change this number
\`\`\`

### Adjust Time Estimates
In `/src/app/hooks/usePeakHours.ts`:
\`\`\`typescript
estimatedTime: isPeakTime ? '40-45 minutes' : '20-30 minutes'
//                           ↑ Peak time      ↑ Normal time
\`\`\`

### Change Refresh Interval
In `/src/app/hooks/usePeakHours.ts`:
\`\`\`typescript
// Refresh every 5 minutes (300000ms)
const interval = setInterval(checkPeakStatus, 5 * 60 * 1000);
//                                             ↑ Change this
\`\`\`

## 🎯 Next Steps

1. **Current**: Test the in-memory system
2. **Phase 2**: Add Vercel KV for persistence
3. **Phase 3**: Add SMS notifications when orders ready
4. **Phase 4**: Add online payment processing
5. **Phase 5**: Add customer order tracking page

## 📞 Support
Questions? Call Bits & Pizzas at (928) 536-4005
