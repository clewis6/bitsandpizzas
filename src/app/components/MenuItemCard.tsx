'use client';

import Image from 'next/image';
import { useCart } from './CartContext';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  category?: string;
}

export default function MenuItemCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  isPopular = false,
  category
}: MenuItemCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeIn">
      {isPopular && (
        <div className="bg-yellow-300 text-black text-center py-1 text-sm font-bold">
          🔥 POPULAR 🔥
        </div>
      )}
      
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-yellow-300">{name}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:scale-105"
          >
            Add to Cart 🍕
          </button>
        </div>
      </div>
    </div>
  );
}