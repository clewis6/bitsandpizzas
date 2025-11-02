'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

interface SubMeatCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  baseId: string;
}

const meatOptions = [
  { id: 'ham', name: 'Ham', icon: '🍖', description: 'Classic sliced ham' },
  { id: 'salami', name: 'Salami', icon: '🥩', description: 'Italian salami' },
  { id: 'pepperoni', name: 'Pepperoni', icon: '🍕', description: 'Spicy pepperoni' }
];

const sizes = [
  { id: 'small', name: 'Small', price: 6.99 },
  { id: 'large', name: 'Large', price: 8.99 }
];

export default function SubMeatCustomizer({ isOpen, onClose, baseId }: SubMeatCustomizerProps) {
  const [selectedMeat, setSelectedMeat] = useState<string>('ham');
  const [selectedSize, setSelectedSize] = useState<string>('small');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const currentSize = sizes.find(s => s.id === selectedSize)!;

  const handleAddToCart = () => {
    const meat = meatOptions.find(m => m.id === selectedMeat);
    
    addToCart({
      id: `${baseId}-sub-${selectedMeat}-${selectedSize}`,
      name: `${currentSize.name} ${meat!.name} Sub`,
      price: currentSize.price,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedMeat('ham');
    setSelectedSize('small');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              🥪 Customize Your Sub
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
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          
          {/* Size Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">1. Choose Your Size</h3>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
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
                  <div className="text-2xl font-bold mb-2">{size.name}</div>
                  <div className="text-3xl font-bold">${size.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Meat Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">2. Choose Your Meat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meatOptions.map((meat) => (
                <button
                  key={meat.id}
                  onClick={() => setSelectedMeat(meat.id)}
                  className={`
                    p-8 rounded-xl font-bold text-lg transition-all duration-300
                    ${selectedMeat === meat.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-5xl mb-3">{meat.icon}</div>
                  <div className="text-2xl mb-2">{meat.name}</div>
                  <div className="text-sm opacity-80">{meat.description}</div>
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
                <span>{currentSize.name} {meatOptions.find(m => m.id === selectedMeat)?.name} Sub</span>
                <span>${currentSize.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-yellow-300 text-2xl font-bold">
                <span>Total:</span>
                <span>${currentSize.price.toFixed(2)}</span>
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
              Add to Cart - ${currentSize.price.toFixed(2)} 🥪
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
