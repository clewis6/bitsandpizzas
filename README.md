# 🍕 Bits & Pizzas - The Ultimate Restaurant Website

**Locally Loved for 40 Years!**

A high-end, hilarious, and addictive restaurant website featuring pizza ordering, a viral Pizza Generator, and a complete kitchen management system.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Logo**
   - Save your Bits & Pizzas logo as `logo.png` in the `/public` folder
   - The logo will automatically appear in:
     - Navigation bar
     - Home page hero section
     - Footer
     - Admin dashboard
     - Favicon

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Visit Your Site**
   - Open http://localhost:3000
   - Start with the home page
   - Try the viral Pizza Generator at `/generator`
   - Test the ordering flow at `/menu`
   - View the kitchen dashboard at `/admin`

## 🎲 Features

### 🏠 Home Page
- Stunning hero section with animated logo
- Feature showcase with humor
- Customer testimonials
- Call-to-action buttons

### 🍕 Menu System
- Responsive pizza grid
- Add-to-cart functionality
- Real-time cart updates
- Floating cart button

### 🎲 Pizza Generator (The Star!)
- 50,000+ possible combinations
- Animated generation process
- Social sharing integration
- Easter eggs and humor
- Pineapple controversy detector

### 🛒 Checkout Flow
- Complete order form
- Delivery/pickup options
- Fake payment processing
- Order confirmation

### 📱 Kitchen Dashboard
- Real-time order management
- Order status tracking
- Customer information display
- Auto-refresh functionality

## 🎨 Design System

### Colors
- **Pizza Red**: `#B01C26` (Primary brand color)
- **Gold Yellow**: `#FFD85E` (Accent color)
- **Oven Black**: `#0B0B0B` (Background)

### Typography
- **Headers**: Lobster Two (Google Fonts)
- **Body**: Open Sans (Google Fonts)

### Animations
- Fade-in effects
- Bounce animations
- Glow effects for buttons
- Hover transformations

## 📱 Responsive Design

Built mobile-first with Tailwind CSS:
- **Mobile**: Stacked layouts, touch-friendly buttons
- **Tablet**: Optimized admin dashboard
- **Desktop**: Full feature experience

## 🎭 Demo Features

This is a demonstration website with:
- Fake payment processing
- Local storage for orders
- Mock kitchen dashboard
- Social sharing integration

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context
- **Icons**: Emoji-based for fun
- **Fonts**: Google Fonts integration

## 📁 Project Structure

```
bitsnpizzas/
├── src/app/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx      # Navigation with logo
│   │   ├── Footer.tsx      # Footer with branding
│   │   ├── CartContext.tsx # Cart state management
│   │   └── MenuItemCard.tsx# Menu item display
│   ├── menu/               # Menu page
│   ├── generator/          # Pizza Generator
│   ├── checkout/           # Order checkout
│   ├── admin/              # Kitchen dashboard
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # App layout
│   └── globals.css         # Global styles
├── public/
│   └── logo.png           # Your logo here!
└── README.md
```

## 🎯 Key Features Explained

### Pizza Generator Algorithm
- Randomly combines bases, sauces, cheeses, meats, and vegetables
- Generates creative names using adjectives + nouns
- Includes fun facts and social sharing
- Easter egg for pineapple controversy

### Cart System
- Persistent cart state using React Context
- Real-time total calculations
- Quantity adjustments
- Floating cart button with item count

### Kitchen Dashboard
- Simulates real restaurant operations
- Order status progression (Received → In Progress → Ready → Completed)
- Auto-refresh every 5 seconds
- Customer information display

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🎉 Easter Eggs

- Type "pineapple" in the generator multiple times
- Check console logs for kitchen notifications
- Hidden humor in component comments
- Animated logo interactions

## 📞 Support

Built with ❤️, cheese, and lots of coffee.

**"Powered by dough, cheese, and chaos."** - Management

---

*This is a demonstration project. For production use, integrate real payment processing, database storage, and authentication systems.*
