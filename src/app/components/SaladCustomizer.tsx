'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

interface SaladCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  saladName: string;
  basePrice: number;
  baseId: string;
}

const dressingOptions = [
  { id: 'ranch', name: 'Ranch', icon: '🥛', description: 'Creamy ranch' },
  { id: 'italian', name: 'Italian', icon: '🇮🇹', description: 'Zesty Italian' },
  { id: 'thousand-island', name: 'Thousand Island', icon: '🥄', description: 'Sweet & tangy' },
  { id: 'caesar', name: 'Caesar', icon: '👑', description: 'Classic Caesar' },
  { id: 'balsamic', name: 'Balsamic Vinaigrette', icon: '🍃', description: 'Light & tangy' },
  { id: 'blue-cheese', name: 'Blue Cheese', icon: '🧀', description: 'Bold & creamy' }
];

export default function SaladCustomizer({ isOpen, onClose, saladName, basePrice, baseId }: SaladCustomizerProps) {
  const [selectedDressing, setSelectedDressing] = useState<string>('ranch');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const dressing = dressingOptions.find(d => d.id === selectedDressing);
    
    addToCart({
      id: `${baseId}-${Math.random()}`,
      name: `${saladName} with ${dressing?.name} Dressing`,
      price: basePrice,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedDressing('ranch');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              🥗 {saladName}
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
          
          {/* Dressing Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Choose Your Dressing</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {dressingOptions.map((dressing) => (
                <button
                  key={dressing.id}
                  onClick={() => setSelectedDressing(dressing.id)}
                  className={`
                    p-8 rounded-xl font-bold text-lg transition-all duration-300
                    ${selectedDressing === dressing.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-5xl mb-3">{dressing.icon}</div>
                  <div className="text-xl mb-2">{dressing.name}</div>
                  <div className="text-sm opacity-80">{dressing.description}</div>
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
                <span>{saladName} with {dressingOptions.find(d => d.id === selectedDressing)?.name} Dressing</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-yellow-300 text-2xl font-bold">
                <span>Total:</span>
                <span>${basePrice.toFixed(2)}</span>
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
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl animate-glow"
            >
              Add to Cart - ${basePrice.toFixed(2)} 🥗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
