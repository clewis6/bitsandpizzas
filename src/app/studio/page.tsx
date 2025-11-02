'use client';

import { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useRouter } from 'next/navigation';

interface Topping {
  id: string;
  name: string;
  icon: string;
  color: string;
  price: number;
}

interface DroppedTopping {
  id: string;
  toppingId: string;
  x: number;
  y: number;
  rotation: number;
}

const sizes = [
  { id: 0, name: 'Small', size: '10"', basePrice: 9.99, diameter: 200, toppingPrice: 1.10 },
  { id: 1, name: 'Medium', size: '12"', basePrice: 11.99, diameter: 260, toppingPrice: 1.49 },
  { id: 2, name: 'Large', size: '14"', basePrice: 15.99, diameter: 320, toppingPrice: 1.99 },
  { id: 3, name: 'X-Large', size: '16"', basePrice: 17.99, diameter: 360, toppingPrice: 1.99 },
  { id: 4, name: 'Family', size: '18"', basePrice: 23.99, diameter: 400, toppingPrice: 2.49 }
];

const toppings: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', icon: '🍕', color: '#c0392b', price: 0 },
  { id: 'sausage', name: 'Sausage', icon: '🌭', color: '#8b4513', price: 0 },
  { id: 'beef', name: 'Ground Beef', icon: '🥩', color: '#654321', price: 0 },
  { id: 'ham', name: 'Ham', icon: '🍖', color: '#d98695', price: 0 },
  { id: 'bacon', name: 'Bacon', icon: '🥓', color: '#8b0000', price: 0 },
  { id: 'chicken', name: 'Chicken', icon: '🍗', color: '#f4a460', price: 0 },
  { id: 'mushrooms', name: 'Mushrooms', icon: '🍄', color: '#daa520', price: 0 },
  { id: 'olives', name: 'Black Olives', icon: '🫒', color: '#2f4f4f', price: 0 },
  { id: 'greenolives', name: 'Green Olives', icon: '🫒', color: '#556b2f', price: 0 },
  { id: 'peppers', name: 'Bell Peppers', icon: '🫑', color: '#228b22', price: 0 },
  { id: 'onions', name: 'Red Onions', icon: '🧅', color: '#8b008b', price: 0 },
  { id: 'tomatoes', name: 'Tomatoes', icon: '🍅', color: '#ff6347', price: 0 },
  { id: 'jalapenos', name: 'Jalapeños', icon: '🌶️', color: '#00ff00', price: 0 },
  { id: 'pineapple', name: 'Pineapple', icon: '🍍', color: '#ffd700', price: 0 },
  { id: 'greenchile', name: 'Green Chile', icon: '🌶️', color: '#90ee90', price: 0 }
];

export default function PizzaStudio() {
  const [selectedSize, setSelectedSize] = useState(2); // Default to Large
  const [droppedToppings, setDroppedToppings] = useState<DroppedTopping[]>([]);
  const [draggedTopping, setDraggedTopping] = useState<Topping | null>(null);
  const [toppingCounts, setToppingCounts] = useState<Record<string, number>>({});
  const { addToCart } = useCart();
  const router = useRouter();

  const currentSize = sizes[selectedSize];
  const uniqueToppings = Object.keys(toppingCounts).length;
  const totalPrice = currentSize.basePrice + (uniqueToppings * currentSize.toppingPrice);

  const handleDragStart = (topping: Topping) => {
    setDraggedTopping(topping);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedTopping) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = currentSize.diameter / 2;

    // Generate multiple topping instances to cover the pizza
    const newToppings: DroppedTopping[] = [];
    const numToppings = Math.floor(currentSize.diameter / 40); // More toppings for larger pizzas (5-10 pieces)

    for (let i = 0; i < numToppings; i++) {
      // Generate random position within pizza circle
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (radius - 20); // Keep away from edges
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      newToppings.push({
        id: `${draggedTopping.id}-${Date.now()}-${i}-${Math.random()}`,
        toppingId: draggedTopping.id,
        x,
        y,
        rotation: Math.random() * 360
      });
    }

    setDroppedToppings([...droppedToppings, ...newToppings]);
    setToppingCounts(prev => ({
      ...prev,
      [draggedTopping.id]: (prev[draggedTopping.id] || 0) + 1
    }));

    setDraggedTopping(null);
  };

  const removeTopping = (toppingId: string) => {
    // Remove all instances of this topping type
    setDroppedToppings(droppedToppings.filter(t => t.toppingId !== toppingId));
    setToppingCounts(prev => {
      const newCounts = { ...prev };
      delete newCounts[toppingId];
      return newCounts;
    });
  };

  const clearAllToppings = () => {
    setDroppedToppings([]);
    setToppingCounts({});
  };

  const handleAddToCart = () => {
    const toppingsList = Object.entries(toppingCounts)
      .map(([id, count]) => {
        const topping = toppings.find(t => t.id === id);
        return `${topping?.name} (${count})`;
      })
      .join(', ');

    const pizzaName = toppingsList 
      ? `${currentSize.name} Custom Pizza: ${toppingsList}`
      : `${currentSize.name} Cheese Pizza`;

    addToCart({
      id: `custom-${Date.now()}`,
      name: pizzaName,
      price: totalPrice,
      image: '/api/placeholder/300/200'
    });

    router.push('/checkout');
  };

  return (
    <div className="bg-warm-gradient min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-300 animate-fadeIn">
            🧑‍🍳 Pizza Studio
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Drag and drop toppings to build your perfect pizza!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Toppings */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">Available Toppings</h2>
              <p className="text-gray-400 text-sm mb-4">Drag toppings onto your pizza!</p>
              
              <div className="grid grid-cols-2 gap-3">
                {toppings.map(topping => {
                  const isOnPizza = toppingCounts[topping.id] > 0;
                  return (
                    <div
                      key={topping.id}
                      draggable
                      onDragStart={() => handleDragStart(topping)}
                      className={`p-4 rounded-lg cursor-grab active:cursor-grabbing transition-all hover:scale-105 ${
                        isOnPizza 
                          ? 'bg-green-700 border-2 border-yellow-300' 
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-4xl mb-2 text-center">{topping.icon}</div>
                      <div className="text-white text-sm text-center">{topping.name}</div>
                      {isOnPizza && (
                        <div className="text-yellow-300 text-xs text-center mt-1 font-bold">
                          ✓ On Pizza
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-300 mb-2">
                  <strong className="text-yellow-300">Price per topping:</strong> ${currentSize.toppingPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-300">
                  <strong className="text-yellow-300">Unique toppings:</strong> {uniqueToppings}
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Pizza Builder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-8">
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Choose Your Size</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-lg font-bold transition-all ${
                        selectedSize === size.id
                          ? 'bg-yellow-300 text-black scale-105 shadow-xl'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-lg">{size.name}</div>
                      <div className="text-xs">{size.size}</div>
                      <div className="text-sm mt-1">${size.basePrice}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pizza Canvas */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Build Your Pizza</h3>
                <div 
                  className="relative mx-auto bg-gray-800 rounded-xl p-8"
                  style={{ 
                    width: `${currentSize.diameter + 100}px`, 
                    height: `${currentSize.diameter + 100}px`,
                    maxWidth: '100%'
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {/* Pizza Base */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl"
                    style={{
                      width: `${currentSize.diameter}px`,
                      height: `${currentSize.diameter}px`,
                      background: 'radial-gradient(circle, #f4e4c1 0%, #e8d4a0 50%, #d4b887 100%)',
                      border: '8px solid #c19a6b',
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Cheese Layer */}
                    <div
                      className="absolute inset-0 rounded-full opacity-80"
                      style={{
                        background: 'radial-gradient(circle, #fff5cc 0%, #ffeb99 50%, #ffd966 100%)',
                        margin: '4px'
                      }}
                    />

                    {/* Dropped Toppings */}
                    {droppedToppings.map(dropped => {
                      const topping = toppings.find(t => t.id === dropped.toppingId);
                      return (
                        <div
                          key={dropped.id}
                          className="absolute cursor-pointer hover:scale-125 transition-transform"
                          style={{
                            left: `${dropped.x}px`,
                            top: `${dropped.y}px`,
                            transform: `translate(-50%, -50%) rotate(${dropped.rotation}deg)`,
                            fontSize: '2rem',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                          onClick={() => removeTopping(dropped.toppingId)}
                          title={`Click to remove all ${topping?.name}`}
                        >
                          {topping?.icon}
                        </div>
                      );
                    })}

                    {/* Drop Zone Hint */}
                    {droppedToppings.length === 0 && !draggedTopping && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-center p-8">
                        <div>
                          <div className="text-6xl mb-4">🍕</div>
                          <div className="text-xl font-bold">Drag toppings here!</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Drag Indicator */}
                  {draggedTopping && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold text-center animate-bounce">
                      Drop {draggedTopping.name} on the pizza!
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={clearAllToppings}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-all"
                  >
                    🗑️ Clear All
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-xl"
                  >
                    Add to Cart - ${totalPrice.toFixed(2)} 🛒
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Your Pizza</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>{currentSize.name} Pizza Base ({currentSize.size})</span>
                    <span>${currentSize.basePrice.toFixed(2)}</span>
                  </div>
                  {Object.entries(toppingCounts).map(([id, count]) => {
                    const topping = toppings.find(t => t.id === id);
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span>{topping?.icon} {topping?.name} × {count}</span>
                        <span>${currentSize.toppingPrice.toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-bold text-yellow-300">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a
            href="/menu"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
          >
            ← Back to Menu
          </a>
        </div>
      </div>
    </div>
  );
}
