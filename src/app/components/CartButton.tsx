'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function CartButton() {
  const { itemCount, total } = useCart();

  return (
    <Link href="/checkout">
      <div className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-glow z-40">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛒</span>
          {itemCount > 0 && (
            <>
              <span className="bg-yellow-300 text-black px-2 py-1 rounded-full text-sm font-bold">
                {itemCount}
              </span>
              <span className="hidden sm:block font-bold">
                ${total.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}