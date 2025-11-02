'use client';

import { useState } from 'react';

interface SpecialtyPizzaSauceCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  pizzaName: string;
  baseId: string;
  onComplete: (sauce: string, size: string, price: number) => void;
}

const sauceOptions = [
  { id: 'bbq', name: 'BBQ Sauce', icon: '🍖', description: 'Sweet and tangy BBQ' },
  { id: 'hot', name: 'Hot Sauce', icon: '🔥', description: 'Spicy and bold!' }
];

const sizes = [
  { id: 0, name: 'Medium', size: '12"', basePrice: 14.99 },
  { id: 1, name: 'Large', size: '14"', basePrice: 18.99 },
  { id: 2, name: 'X-Large', size: '16"', basePrice: 19.99 }
];

export default function SpecialtyPizzaSauceCustomizer({ 
  isOpen, 
  onClose, 
  pizzaName,
  onComplete 
}: SpecialtyPizzaSauceCustomizerProps) {
  const [selectedSauce, setSelectedSauce] = useState<string>('bbq');
  const [selectedSize, setSelectedSize] = useState<number>(0);

  if (!isOpen) return null;

  const currentSize = sizes[selectedSize];

  const handleAddToCart = () => {
    const sauce = sauceOptions.find(s => s.id === selectedSauce);
    const sizeName = currentSize.name;
    onComplete(sauce!.name, sizeName, currentSize.basePrice);
    
    // Reset and close
    setSelectedSauce('bbq');
    setSelectedSize(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              🍕 {pizzaName}
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
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          
          {/* Size Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">1. Choose Your Size</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`
                    p-6 rounded-xl font-bold transition-all duration-300
                    ${selectedSize === size.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-3xl font-bold mb-2">{size.name}</div>
                  <div className="text-lg mb-2">{size.size}</div>
                  <div className="text-2xl font-bold">${size.basePrice.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sauce Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">2. Choose Your Sauce Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {sauceOptions.map((sauce) => (
                <button
                  key={sauce.id}
                  onClick={() => setSelectedSauce(sauce.id)}
                  className={`
                    p-8 rounded-xl font-bold text-lg transition-all duration-300
                    ${selectedSauce === sauce.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-5xl mb-3">{sauce.icon}</div>
                  <div className="text-2xl mb-2">{sauce.name}</div>
                  <div className="text-sm opacity-80">{sauce.description}</div>
                </button>
              ))}
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
                <span>{currentSize.name} {pizzaName} - {sauceOptions.find(s => s.id === selectedSauce)?.name}</span>
                <span>${currentSize.basePrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-yellow-300 text-2xl font-bold">
                <span>Total:</span>
                <span>${currentSize.basePrice.toFixed(2)}</span>
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
              Add to Cart - ${currentSize.basePrice.toFixed(2)} 🍕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
