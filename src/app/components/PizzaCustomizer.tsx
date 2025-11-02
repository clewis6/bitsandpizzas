'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

interface PizzaCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  pizzaName: string;
  baseId: string;
  isSpecial?: boolean;
  specialPrice?: number;
}

interface Size {
  name: string;
  size: string;
  basePrice: number;
  toppingPrice: number;
}

const sizes: Size[] = [
  { name: 'Small', size: '10"', basePrice: 7.99, toppingPrice: 1.10 },
  { name: 'Medium', size: '12"', basePrice: 9.99, toppingPrice: 1.49 },
  { name: 'Large', size: '14"', basePrice: 13.99, toppingPrice: 1.99 },
  { name: 'X-Large', size: '16"', basePrice: 17.99, toppingPrice: 1.99 },
  { name: 'Family', size: '18"', basePrice: 23.99, toppingPrice: 2.49 }
];

const availableToppings = [
  'Pepperoni', 'Sausage', 'Ground Beef', 'Ham', 'Bacon', 'Chicken',
  'Green Chile', 'Jalapeños', 'Black Olives', 'Green Olives',
  'Mushrooms', 'Bell Pepper', 'Pineapple', 'Tomato', 'Red Onion'
];

export default function PizzaCustomizer({ isOpen, onClose, pizzaName, baseId, isSpecial = false, specialPrice }: PizzaCustomizerProps) {
  const [selectedSize, setSelectedSize] = useState<number>(1); // Default to Medium
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const { addToCart } = useCart();

  // For daily specials, limit to 1 topping and use fixed price
  const maxToppings = isSpecial ? 1 : 999;
  const useFixedPrice = isSpecial && specialPrice !== undefined;

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
  const totalPrice = useFixedPrice 
    ? specialPrice! 
    : currentSize.basePrice + (selectedToppings.length * currentSize.toppingPrice);

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      // For daily specials, only allow 1 topping
      if (isSpecial) {
        setSelectedToppings([topping]);
      } else {
        setSelectedToppings([...selectedToppings, topping]);
      }
    }
  };

  const handleAddToCart = () => {
    const customPizzaName = selectedToppings.length > 0
      ? `${isSpecial ? pizzaName : currentSize.name + ' ' + pizzaName} + ${selectedToppings.join(', ')}`
      : `${isSpecial ? pizzaName : currentSize.name + ' ' + pizzaName}`;

    addToCart({
      id: `${baseId}-${Date.now()}`,
      name: customPizzaName,
      price: totalPrice,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedToppings([]);
    if (!isSpecial) {
      setSelectedSize(1);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-warm-gradient z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-6 sticky top-0 z-10 shadow-xl">
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">Customize Your {pizzaName}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-500 text-4xl font-bold leading-none w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Size Selection - Hide for daily specials */}
          {!isSpecial && (
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">1. Choose Your Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  className={`
                    p-6 rounded-xl font-bold transition-all duration-300 text-center
                    ${selectedSize === index
                      ? 'bg-red-600 text-white transform scale-105 shadow-2xl ring-4 ring-yellow-300'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-2xl md:text-xl mb-1">{size.name}</div>
                  <div className="text-sm opacity-80">{size.size}</div>
                  <div className="text-yellow-300 text-lg md:text-base mt-2 font-bold">
                    ${size.basePrice.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Toppings Selection */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-3 text-center">
              {isSpecial ? 'Choose Your One Topping' : `${!isSpecial ? '2. ' : ''}Add Toppings (${selectedToppings.length} selected)`}
            </h3>
            {isSpecial ? (
              <p className="text-gray-400 mb-6 text-center text-lg">
                This special includes one topping of your choice - Fixed price ${specialPrice?.toFixed(2)}
              </p>
            ) : (
              <p className="text-gray-400 mb-6 text-center text-lg">
                ${currentSize.toppingPrice.toFixed(2)} per topping for {currentSize.name} size
              </p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {availableToppings.map((topping) => (
                <button
                  key={topping}
                  onClick={() => toggleTopping(topping)}
                  className={`
                    p-4 rounded-lg font-medium transition-all duration-300 text-center
                    ${selectedToppings.includes(topping)
                      ? 'bg-green-600 text-white ring-2 ring-yellow-300 transform scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
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
          <div className="bg-gray-900 rounded-2xl p-8 mb-8 shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>{isSpecial ? pizzaName : `${currentSize.name} ${pizzaName} (${currentSize.size})`}</span>
                <span>${useFixedPrice ? specialPrice!.toFixed(2) : currentSize.basePrice.toFixed(2)}</span>
              </div>
              
              {!isSpecial && selectedToppings.length > 0 && (
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
              
              {isSpecial && selectedToppings.length === 0 && (
                <div className="text-yellow-300 text-sm text-center py-2">
                  ⚠️ Please select your one topping
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-600 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-yellow-300">Total:</span>
                <span className="text-4xl font-bold text-yellow-300">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 max-w-3xl mx-auto sticky bottom-0 bg-warm-gradient pb-8 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-5 rounded-xl font-bold text-xl transition-colors shadow-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isSpecial && selectedToppings.length === 0}
              className={`
                flex-1 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl
                ${isSpecial && selectedToppings.length === 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 hover:scale-105 animate-glow'
                }
              `}
            >
              Add to Cart - ${totalPrice.toFixed(2)} 🍕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
