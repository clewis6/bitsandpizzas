'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

interface WingCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  basePrice: number;
  baseId: string;
}

const sauceOptions = [
  { id: 'bbq', name: 'BBQ Sauce', icon: '🍖' },
  { id: 'teriyaki', name: 'Teriyaki Sauce', icon: '🥢' },
  { id: 'hot', name: 'Hot Sauce', icon: '🔥' }
];

export default function WingCustomizer({ isOpen, onClose, itemName, basePrice, baseId }: WingCustomizerProps) {
  const [selectedSauce, setSelectedSauce] = useState<string>('bbq');
  const [quantity, setQuantity] = useState<number>(6);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const totalPrice = basePrice * quantity;

  const handleAddToCart = () => {
    const sauce = sauceOptions.find(s => s.id === selectedSauce);
    addToCart({
      id: `${baseId}-${Date.now()}`,
      name: `${quantity} ${itemName} - ${sauce?.name}`,
      price: totalPrice,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedSauce('bbq');
    setQuantity(6);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              🍗 Customize Your Wings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-4xl font-bold transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Sauce Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Choose Your Sauce</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sauceOptions.map((sauce) => (
                <button
                  key={sauce.id}
                  onClick={() => setSelectedSauce(sauce.id)}
                  className={`
                    p-6 rounded-xl font-bold text-lg transition-all duration-300
                    ${selectedSauce === sauce.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-4xl mb-2">{sauce.icon}</div>
                  <div>{sauce.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">How Many Wings?</h3>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full text-3xl font-bold transition-all hover:scale-110"
                >
                  −
                </button>
                <div className="text-center">
                  <div className="text-5xl font-bold text-yellow-300">{quantity}</div>
                  <div className="text-gray-400 mt-2">Wings</div>
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full text-3xl font-bold transition-all hover:scale-110"
                >
                  +
                </button>
              </div>
              <div className="text-center mt-6">
                <div className="text-gray-400">Price per wing: ${basePrice.toFixed(2)}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-900 shadow-2xl border-t-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-gray-800 rounded-xl p-6 mb-4">
            <div className="text-2xl font-bold text-yellow-300 mb-2">Order Summary</div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>{quantity} {itemName} - {sauceOptions.find(s => s.id === selectedSauce)?.name}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-yellow-300 text-2xl font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl animate-glow"
            >
              Add to Cart - ${totalPrice.toFixed(2)} 🍗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
