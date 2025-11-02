'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

interface DrinkCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  baseId: string;
  itemType: 'fountain' | 'bottle' | '2liter';
}

const fountainSizes = [
  { id: 'small', name: 'Small', price: 1.39 },
  { id: 'medium', name: 'Medium', price: 1.69 },
  { id: 'large', name: 'Large', price: 1.99 },
  { id: 'xlarge', name: 'X-Large', price: 2.19 }
];

const drinkFlavors = [
  { id: 'coke', name: 'Coca-Cola', icon: '🥤' },
  { id: 'diet-coke', name: 'Diet Coke', icon: '🥤' },
  { id: 'sprite', name: 'Sprite', icon: '🥤' },
  { id: 'dr-pepper', name: 'Dr Pepper', icon: '🥤' },
  { id: 'fanta', name: 'Fanta Orange', icon: '🥤' },
  { id: 'lemonade', name: 'Lemonade', icon: '🍋' },
  { id: 'root-beer', name: 'Root Beer', icon: '🥤' },
  { id: 'sweet-tea', name: 'Sweet Tea', icon: '🍵' }
];

export default function DrinkCustomizer({ isOpen, onClose, baseId, itemType }: DrinkCustomizerProps) {
  const [selectedSize, setSelectedSize] = useState<string>('medium');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('coke');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const getPrice = () => {
    if (itemType === 'bottle') return 3.39;
    if (itemType === '2liter') return 3.99;
    return fountainSizes.find(s => s.id === selectedSize)?.price || 1.69;
  };

  const handleAddToCart = () => {
    const flavor = drinkFlavors.find(f => f.id === selectedFlavor);
    const size = fountainSizes.find(s => s.id === selectedSize);
    
    let itemName = '';
    if (itemType === 'fountain') {
      itemName = `${size?.name} ${flavor?.name}`;
    } else if (itemType === 'bottle') {
      itemName = `20 oz. ${flavor?.name}`;
    } else {
      itemName = `2 Liter ${flavor?.name}`;
    }

    addToCart({
      id: `${baseId}-${Math.random()}`,
      name: itemName,
      price: getPrice(),
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedSize('medium');
    setSelectedFlavor('coke');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              🥤 Choose Your Drink
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
          
          {/* Size Selection (only for fountain drinks) */}
          {itemType === 'fountain' && (
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">1. Choose Your Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fountainSizes.map((size) => (
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
                    <div className="text-2xl font-bold">${size.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              {itemType === 'fountain' ? '2. ' : ''}Choose Your Flavor
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {drinkFlavors.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => setSelectedFlavor(flavor.id)}
                  className={`
                    p-6 rounded-xl font-bold transition-all duration-300
                    ${selectedFlavor === flavor.id
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-4xl mb-2">{flavor.icon}</div>
                  <div className="text-sm">{flavor.name}</div>
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
                <span>
                  {itemType === 'fountain' && `${fountainSizes.find(s => s.id === selectedSize)?.name} `}
                  {itemType === 'bottle' && '20 oz. '}
                  {itemType === '2liter' && '2 Liter '}
                  {drinkFlavors.find(f => f.id === selectedFlavor)?.name}
                </span>
                <span>${getPrice().toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-yellow-300 text-2xl font-bold">
                <span>Total:</span>
                <span>${getPrice().toFixed(2)}</span>
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl animate-glow"
            >
              Add to Cart - ${getPrice().toFixed(2)} 🥤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
