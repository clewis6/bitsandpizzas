'use client';

import { useState } from 'react';
import { useCart } from '../components/CartContext';

interface GeneratedPizza {
  name: string;
  ingredients: string[];
  description: string;
  price: number;
  funFact: string;
  toppingsCount: number;
  size: string;
}

// Pizza size options with realistic pricing from actual menu
const pizzaSizes = [
  { name: 'Personal', size: '10"', multiplier: 0.75, description: 'Perfect for one', basePrice: 9.99, toppingPrice: 1.25 },
  { name: 'Medium', size: '12"', multiplier: 1.0, description: 'Great for sharing', basePrice: 11.99, toppingPrice: 1.50 },
  { name: 'Large', size: '16"', multiplier: 1.33, description: 'Feed the family', basePrice: 15.99, toppingPrice: 1.99 },
  { name: 'XL', size: '20"', multiplier: 1.67, description: 'Party sized!', basePrice: 19.99, toppingPrice: 2.50 }
];

// Pizza generation data
const bases = ['Thin Crust', 'Thick Crust', 'Stuffed Crust', 'Cauliflower Crust', 'Gluten-Free'];
const sauces = ['Tomato', 'White Garlic', 'BBQ', 'Pesto', 'Buffalo', 'Olive Oil'];
const cheeses = ['Mozzarella', 'Cheddar', 'Goat Cheese', 'Feta', 'Provolone', 'Swiss'];

// Combined toppings pool for random selection
const allToppings = [
  'Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Chicken', 'Prosciutto', 'Anchovies',
  'Mushrooms', 'Bell Peppers', 'Onions', 'Tomatoes', 'Spinach', 'Jalapeños', 
  'Pineapple', 'Olives', 'Arugula', 'Red Onions', 'Sun-dried Tomatoes', 
  'Artichoke Hearts', 'Capers', 'Basil', 'Cilantro'
];

const seasonings = ['Oregano', 'Basil', 'Garlic', 'Red Pepper Flakes', 'Rosemary', 'Thyme'];

// Realistic pricing structure based on actual Bits & Pizzas menu
// Base prices are now per-size specific from the real menu
const BASE_PRICE = 11.99; // Medium cheese pizza base price from actual menu
const PRICE_PER_TOPPING = 1.50; // Actual per topping cost from menu

const funFacts = [
  'This combination was actually invented by a customer in 1987!',
  'Our kitchen staff calls this the "Midnight Madness"',
  'This pizza has a 73% reorder rate - surprisingly addictive!',
  'Legend says this recipe came to our founder in a dream',
  'Three food critics have rated this combination 5 stars',
  'This was the first pizza created by our original generator in 1999',
  'Our delivery drivers request this pizza most often',
  'This combination has been featured in 2 food magazines',
  'A customer once drove 200 miles just for this specific pizza',
  'If your pizza tastes weird, blame the algorithm... or love it anyway!'
];

const adjectives = ['Crazy', 'Wild', 'Epic', 'Magical', 'Legendary', 'Mysterious', 'Ultimate', 'Supreme', 'Chaotic', 'Divine'];
const nouns = ['Explosion', 'Adventure', 'Madness', 'Symphony', 'Paradise', 'Journey', 'Experience', 'Masterpiece', 'Revolution', 'Phenomenon'];

export default function Generator() {
  const [generatedPizza, setGeneratedPizza] = useState<GeneratedPizza | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pineappleCount, setPineappleCount] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState(5); // Default to 5 toppings
  const [selectedSize, setSelectedSize] = useState(1); // Default to Medium (index 1)
  const { addToCart } = useCart();

  const getCurrentSize = () => pizzaSizes[selectedSize];
  const getCurrentPrice = () => {
    const currentSize = getCurrentSize();
    return currentSize.basePrice + (selectedToppings * currentSize.toppingPrice);
  };

  const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomToppings = (count: number) => {
    const shuffled = [...allToppings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generatePizza = () => {
    setIsGenerating(true);
    
    // Easter egg for pineapple
    if (Math.random() < 0.3) {
      setPineappleCount(prev => prev + 1);
    }

    setTimeout(() => {
      const base = getRandomElement(bases);
      const sauce = getRandomElement(sauces);
      const cheese = getRandomElement(cheeses);
      
      // Get random toppings based on user selection
      const toppings = getRandomToppings(selectedToppings);
      
      const seasoning = getRandomElement(seasonings);
      const adjective = getRandomElement(adjectives);
      const noun = getRandomElement(nouns);
      
      // Calculate price based on base price + toppings + size multiplier
      const currentSize = getCurrentSize();
      const price = getCurrentPrice();
      
      const ingredients = [base, sauce, cheese, ...toppings, seasoning];
      const name = `${adjective} ${noun}`;
      
      const pizza: GeneratedPizza = {
        name,
        ingredients,
        description: `A ${currentSize.size} ${base.toLowerCase()} pizza with ${sauce.toLowerCase()} sauce, ${cheese.toLowerCase()}, ${toppings.join(', ').toLowerCase()}, and a sprinkle of ${seasoning.toLowerCase()}.`,
        price: Math.round(price * 100) / 100, // Round to 2 decimal places
        funFact: getRandomElement(funFacts),
        toppingsCount: selectedToppings,
        size: `${currentSize.name} (${currentSize.size})`
      };
      
      setGeneratedPizza(pizza);
      setIsGenerating(false);
    }, 2000);
  };

  const addToCartHandler = () => {
    if (generatedPizza) {
      addToCart({
        id: `generated-${Date.now()}`,
        name: generatedPizza.name,
        price: generatedPizza.price,
        image: '/api/placeholder/300/200'
      });
    }
  };

  const shareOnTwitter = () => {
    if (generatedPizza) {
      const text = `I just created "${generatedPizza.name}" on Bits & Pizzas! 🍕 ${generatedPizza.description}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-pizza-gradient min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-300 animate-bounceIn">
            🎲 Pizza Generator
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Can&apos;t decide what to order? Let chaos and algorithms create your perfect pizza combination!
          </p>
          <div className="bg-gray-900 p-4 rounded-xl inline-block">
            <p className="text-yellow-300 font-bold">
              ⚡ Over 50,000 possible combinations!
            </p>
          </div>
        </div>

        {/* Size & Topping Selection */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
            🎯 Customize Your Chaos
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Choose Your Size
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pizzaSizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`
                      p-4 rounded-xl font-bold transition-all duration-300 text-center
                      ${selectedSize === index 
                        ? 'bg-red-600 text-white transform scale-105' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    <div className="text-lg font-bold">{size.name}</div>
                    <div className="text-sm opacity-80">{size.size}</div>
                    <div className="text-xs mt-1">{size.description}</div>
                    <div className="text-yellow-300 text-sm mt-2">
                      ${((BASE_PRICE + (selectedToppings * PRICE_PER_TOPPING)) * size.multiplier).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topping Selection */}
            <div className="mb-6">
              <label className="block text-white text-xl font-bold mb-4 text-center">
                How many toppings do you want? ({selectedToppings} toppings)
              </label>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-gray-300">1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedToppings}
                  onChange={(e) => setSelectedToppings(parseInt(e.target.value))}
                  className="flex-1 h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-gray-300">10</span>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  ${getCurrentPrice().toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm mb-2">
                  {getCurrentSize().name} ({getCurrentSize().size}): Base ${BASE_PRICE.toFixed(2)} + {selectedToppings} toppings (${PRICE_PER_TOPPING.toFixed(2)} each)
                </div>
                <div className="text-gray-400 text-xs">
                  × {getCurrentSize().multiplier} size multiplier
                </div>
                <div className="text-yellow-300 text-xs mt-1">
                  💡 Pricing matches our regular menu structure!
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedToppings(num)}
                  className={`
                    py-2 px-4 rounded-lg font-bold transition-all duration-300
                    ${selectedToppings === num 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="text-center text-gray-400 text-sm">
              💡 More toppings = more chaos = more deliciousness!
            </div>
          </div>
        </div>

        {/* Generator Button */}
        <div className="text-center mb-16">
          <button
            onClick={generatePizza}
            disabled={isGenerating}
            className={`
              ${isGenerating 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 hover:scale-110 animate-glow'
              }
              text-white px-12 py-6 rounded-2xl text-2xl font-bold 
              transition-all duration-300 shadow-2xl
            `}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-3">🎲</span>
                Generating Magic...
              </span>
            ) : (
              'Generate My Pizza! 🎲'
            )}
          </button>
        </div>

        {/* Generated Pizza Display */}
        {generatedPizza && (
          <div className="bg-gray-900 rounded-2xl p-8 animate-fadeIn shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-yellow-300 mb-2">
                {generatedPizza.name}
              </h2>
              <div className="text-xl text-gray-300 mb-4">
                {generatedPizza.size}
              </div>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold text-white mb-2">
                  ${generatedPizza.price.toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm">
                  {getCurrentSize().name} ({getCurrentSize().size}): ${getCurrentSize().basePrice.toFixed(2)} base + {generatedPizza.toppingsCount} toppings (${(generatedPizza.toppingsCount * getCurrentSize().toppingPrice).toFixed(2)})
                </div>
                <div className="text-yellow-300 text-sm font-bold mt-2">
                  🎲 {generatedPizza.toppingsCount} Random Toppings Generated! Real menu pricing!
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">🥘 Ingredients:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {generatedPizza.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 px-3 py-2 rounded-lg text-sm text-gray-200"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">📝 Description:</h3>
                <p className="text-gray-300 mb-4">
                  {generatedPizza.description}
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-yellow-300 text-sm italic">
                    💡 Fun Fact: {generatedPizza.funFact}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={addToCartHandler}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Add to Cart 🛒
              </button>
              
              <button
                onClick={shareOnTwitter}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Share Your Chaos 🐦
              </button>
              
              <button
                onClick={generatePizza}
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Generate Another! 🎲
              </button>
            </div>
          </div>
        )}

        {/* Pineapple Easter Egg */}
        {pineappleCount === 3 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-yellow-300 text-black p-8 rounded-2xl text-center animate-bounceIn">
              <h2 className="text-4xl font-bold mb-4">🍍 PINEAPPLE ALERT! 🍍</h2>
              <p className="text-xl mb-4">
                You&apos;ve summoned the Great Hawaiian Debate!
              </p>
              <button
                onClick={() => setPineappleCount(0)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
              >
                I Accept the Controversy
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-16 bg-gray-900 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
            How It Works 🤖
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">📏</div>
              <h4 className="font-bold text-white mb-2">Step 1</h4>
              <p className="text-gray-300 text-sm">
                Pick your pizza size (Personal to XL)
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">�</div>
              <h4 className="font-bold text-white mb-2">Step 2</h4>
              <p className="text-gray-300 text-sm">
                Choose how many toppings you want (1-10)
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">�</div>
              <h4 className="font-bold text-white mb-2">Step 3</h4>
              <p className="text-gray-300 text-sm">
                Let our algorithm pick random toppings for ultimate chaos
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">😋</div>
              <h4 className="font-bold text-white mb-2">Step 4</h4>
              <p className="text-gray-300 text-sm">
                Order your custom creation with transparent pricing!
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-800 rounded-lg p-4">
            <h4 className="text-yellow-300 font-bold mb-2 text-center">💰 Real Menu Pricing</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-300 text-sm">
              {pizzaSizes.map((size, index) => (
                <div key={index}>
                  <p className="font-bold">{size.name} ({size.size})</p>
                  <p>Base: ${size.basePrice.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">+${size.toppingPrice.toFixed(2)}/topping</p>
                </div>
              ))}
            </div>
            <p className="text-yellow-300 text-xs text-center mt-3">
              ✨ Actual prices from our restaurant menu!
            </p>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm italic">
            &quot;If your pizza tastes weird, blame the algorithm.&quot; - Management
          </p>
        </div>
      </div>
    </div>
  );
}