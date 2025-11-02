'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

interface PizzaCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  pizzaName: string;
  baseId: string;
}

interface Size {
  name: string;
  size: string;
  basePrice: number;
  toppingPrice: number;
}

const sizes: Size[] = [
  { name: 'Small', size: '10"', basePrice: 9.99, toppingPrice: 1.10 },
  { name: 'Medium', size: '12"', basePrice: 11.99, toppingPrice: 1.49 },
  { name: 'Large', size: '14"', basePrice: 15.99, toppingPrice: 1.99 },
  { name: 'X-Large', size: '16"', basePrice: 17.99, toppingPrice: 1.99 },
  { name: 'Family', size: '18"', basePrice: 23.99, toppingPrice: 2.49 }
];

const availableToppings = [
  'Pepperoni', 'Sausage', 'Ground Beef', 'Ham', 'Bacon', 'Chicken',
  'Green Chile', 'Jalapeños', 'Black Olives', 'Green Olives',
  'Mushrooms', 'Bell Pepper', 'Pineapple', 'Tomato', 'Red Onion'
];

export default function PizzaCustomizer({ isOpen, onClose, pizzaName, baseId }: PizzaCustomizerProps) {
  const [selectedSize, setSelectedSize] = useState<number>(1); // Default to Medium
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSize = sizes[selectedSize];
  const totalPrice = currentSize.basePrice + (selectedToppings.length * currentSize.toppingPrice);

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    const customPizzaName = selectedToppings.length > 0
      ? `${currentSize.name} ${pizzaName} + ${selectedToppings.join(', ')}`
      : `${currentSize.name} ${pizzaName}`;

    addToCart({
      id: `${baseId}-${Date.now()}`,
      name: customPizzaName,
      price: totalPrice,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedToppings([]);
    setSelectedSize(1);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-3xl font-bold text-yellow-300">Customize Your {pizzaName}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 text-4xl font-bold leading-none w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">1. Choose Your Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  className={`
                    p-4 rounded-xl font-bold transition-all duration-300 text-center
                    ${selectedSize === index
                      ? 'bg-red-600 text-white transform scale-105 shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="text-lg">{size.name}</div>
                  <div className="text-sm opacity-80">{size.size}</div>
                  <div className="text-yellow-300 text-sm mt-1">
                    ${size.basePrice.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              2. Add Toppings ({selectedToppings.length} selected)
            </h3>
            <p className="text-gray-400 mb-4">
              ${currentSize.toppingPrice.toFixed(2)} per topping for {currentSize.name} size
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableToppings.map((topping) => (
                <button
                  key={topping}
                  onClick={() => toggleTopping(topping)}
                  className={`
                    p-3 rounded-lg font-medium transition-all duration-300
                    ${selectedToppings.includes(topping)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }
                  `}
                >
                  {selectedToppings.includes(topping) && '✓ '}
                  {topping}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>{currentSize.name} {pizzaName} ({currentSize.size})</span>
                <span>${currentSize.basePrice.toFixed(2)}</span>
              </div>
              
              {selectedToppings.length > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>{selectedToppings.length} Extra Topping{selectedToppings.length > 1 ? 's' : ''}</span>
                  <span>${(selectedToppings.length * currentSize.toppingPrice).toFixed(2)}</span>
                </div>
              )}
              
              {selectedToppings.length > 0 && (
                <div className="text-sm text-gray-400 pl-4">
                  {selectedToppings.join(', ')}
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-yellow-300">Total:</span>
                <span className="text-3xl font-bold text-yellow-300">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Add to Cart - ${totalPrice.toFixed(2)} 🍕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
