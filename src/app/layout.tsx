import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartButton from "./components/CartButton";
import { CartProvider } from "./components/CartContext";

export const metadata: Metadata = {
  title: "Bits & Pizzas - Locally Loved for 40 Years 🍕",
  description: "The ultimate pizza experience with our famous Pizza Generator! Order online for delivery or pickup.",
  keywords: "pizza, delivery, pickup, restaurant, generator, local",
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <CartButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
