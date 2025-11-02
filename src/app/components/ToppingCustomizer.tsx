'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

interface ToppingCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  basePrice: number;
  baseId: string;
  maxToppings: number; // 1 for Rip & Dip, 2 for Pizza Boat, 3 for Calzone
}

const availableToppings = [
  { id: 'pepperoni', name: 'Pepperoni', icon: '🍕' },
  { id: 'sausage', name: 'Sausage', icon: '🌭' },
  { id: 'beef', name: 'Ground Beef', icon: '🥩' },
  { id: 'ham', name: 'Ham', icon: '🍖' },
  { id: 'bacon', name: 'Bacon', icon: '🥓' },
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'greenchile', name: 'Green Chile', icon: '🌶️' },
  { id: 'jalapenos', name: 'Jalapeños', icon: '🫑' },
  { id: 'blackolives', name: 'Black Olives', icon: '🫒' },
  { id: 'greenolives', name: 'Green Olives', icon: '🫒' },
  { id: 'mushrooms', name: 'Mushrooms', icon: '🍄' },
  { id: 'bellpepper', name: 'Bell Pepper', icon: '🫑' },
  { id: 'pineapple', name: 'Pineapple', icon: '🍍' },
  { id: 'tomato', name: 'Tomato', icon: '🍅' },
  { id: 'redonion', name: 'Red Onion', icon: '🧅' }
];

export default function ToppingCustomizer({ 
  isOpen, 
  onClose, 
  itemName, 
  basePrice, 
  baseId,
  maxToppings 
}: ToppingCustomizerProps) {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const toggleTopping = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter(t => t !== toppingId));
    } else {
      if (selectedToppings.length < maxToppings) {
        setSelectedToppings([...selectedToppings, toppingId]);
      }
    }
  };

  const handleAddToCart = () => {
    const toppingNames = selectedToppings
      .map(id => availableToppings.find(t => t.id === id)?.name)
      .filter(Boolean);
    
    const customName = toppingNames.length > 0
      ? `${itemName} with ${toppingNames.join(', ')}`
      : itemName;

    addToCart({
      id: `${baseId}-${Date.now()}`,
      name: customName,
      price: basePrice,
      image: '/api/placeholder/300/200'
    });

    // Reset and close
    setSelectedToppings([]);
    onClose();
  };

  const getHeaderText = () => {
    if (maxToppings === 1) return 'Choose 1 Topping';
    if (maxToppings === 2) return 'Choose 2 Toppings';
    return `Choose ${maxToppings} Toppings`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 shadow-2xl z-10 border-b-4 border-yellow-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
                {itemName}
              </h2>
              <p className="text-gray-400 mt-2">{getHeaderText()}</p>
            </div>
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
          
          {/* Progress Indicator */}
          <div className="mb-8 bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold text-lg">Toppings Selected</span>
              <span className={`text-2xl font-bold ${selectedToppings.length === maxToppings ? 'text-green-400' : 'text-yellow-300'}`}>
                {selectedToppings.length} / {maxToppings}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  selectedToppings.length === maxToppings ? 'bg-green-400' : 'bg-yellow-300'
                }`}
              />
            </div>
            {selectedToppings.length === maxToppings && (
              <p className="text-green-400 text-center mt-2 font-bold">
                ✓ Maximum toppings selected!
              </p>
            )}
          </div>

          {/* Toppings Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableToppings.map((topping) => {
              const isSelected = selectedToppings.includes(topping.id);
              const isDisabled = !isSelected && selectedToppings.length >= maxToppings;
              
              return (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id)}
                  disabled={isDisabled}
                  className={`
                    p-6 rounded-xl font-bold text-lg transition-all duration-300 relative
                    ${isSelected
                      ? 'bg-yellow-300 text-black scale-105 shadow-2xl ring-4 ring-yellow-400'
                      : isDisabled
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                  )}
                  <div className="text-4xl mb-2">{topping.icon}</div>
                  <div className="text-sm">{topping.name}</div>
                </button>
              );
            })}
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
                <span>{itemName}</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              
              {selectedToppings.length > 0 && (
                <div className="text-sm text-gray-400 pl-4">
                  {selectedToppings.map(id => availableToppings.find(t => t.id === id)?.name).join(', ')}
                </div>
              )}
              
              {selectedToppings.length < maxToppings && (
                <div className="text-yellow-300 text-sm text-center py-2">
                  ⚠️ Please select {maxToppings - selectedToppings.length} more topping{maxToppings - selectedToppings.length > 1 ? 's' : ''}
                </div>
              )}
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
              disabled={selectedToppings.length !== maxToppings}
              className={`
                flex-1 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl
                ${selectedToppings.length !== maxToppings
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 hover:scale-105 animate-glow'
                }
              `}
            >
              Add to Cart - ${basePrice.toFixed(2)} 🍕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
