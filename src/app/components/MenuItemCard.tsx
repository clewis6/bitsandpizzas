'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from './CartContext';
import PizzaCustomizer from './PizzaCustomizer';
import WingCustomizer from './WingCustomizer';
import ToppingCustomizer from './ToppingCustomizer';
import SpecialtyPizzaSauceCustomizer from './SpecialtyPizzaSauceCustomizer';
import SubMeatCustomizer from './SubMeatCustomizer';
import DrinkCustomizer from './DrinkCustomizer';
import SaladCustomizer from './SaladCustomizer';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  category?: string;
}

export default function MenuItemCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  isPopular = false,
  category
}: MenuItemCardProps) {
  const { addToCart } = useCart();
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Determine which type of customization is needed
  const isPizza = category === 'Pizza' || category === 'Specialty Pizzas';
  const isDailySpecial = category === 'Daily Specials' && (
    name.includes('Special') && 
    !name.includes('Lunch') && 
    description.includes('Item')
  );
  const isWings = category === 'Wings';
  const isCalzone = category === 'Calzones';
  const isPizzaBoat = category === 'Pizza Boat';
  const isRipDip = category === 'Rip & Dip';
  const isBitsChickenWing = id === 'bits-chicken-wing';
  const isSingleMeatSub = id === 'single-meat-sub';
  const isFountainDrink = id === 'soda';
  const isBottleDrink = id === 'bottle-soda';
  const is2LiterDrink = id === '2-liter';
  const isSalad = category === 'Salads';
  
  const needsCustomization = isPizza || isDailySpecial || isWings || isCalzone || 
    isPizzaBoat || isRipDip || isBitsChickenWing || isSingleMeatSub || 
    isFountainDrink || isBottleDrink || is2LiterDrink || isSalad;

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  const handleCustomize = () => {
    setShowCustomizer(true);
  };

  const handleSpecialtyPizzaComplete = (sauce: string, size: string, custPrice: number) => {
    addToCart({
      id: `${id}-${Math.random()}`,
      name: `${size} ${name} - ${sauce}`,
      price: custPrice,
      image
    });
  };

  const getButtonText = () => {
    if (isDailySpecial) return 'Customize Special 🎉';
    if (isPizza) return 'Customize Pizza 🍕';
    if (isBitsChickenWing) return 'Choose Your Style 🍗';
    if (isWings) return 'Order Wings 🍗';
    if (isCalzone) return 'Choose Toppings 🌮';
    if (isPizzaBoat) return 'Customize Boat ⛵';
    if (isRipDip) return 'Choose Topping 🍴';
    if (isSingleMeatSub) return 'Choose Your Meat 🥪';
    if (isFountainDrink || isBottleDrink || is2LiterDrink) return 'Choose Flavor 🥤';
    if (isSalad) return 'Choose Dressing 🥗';
    return 'Customize';
  };

  return (
    <>
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeIn">
        {isPopular && (
          <div className="bg-yellow-300 text-black text-center py-1 text-sm font-bold">
            🔥 POPULAR 🔥
          </div>
        )}
        
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-yellow-300">{name}</h3>
          <p className="text-gray-300 mb-4 text-sm">{description}</p>
          
          {needsCustomization ? (
            <div className="space-y-3">
              <div className="text-sm text-gray-400">
                {isDailySpecial ? `Special Price: $${price.toFixed(2)}` : 
                 (isPizza || isBitsChickenWing) ? `Starting at $${price.toFixed(2)}` :
                 `$${price.toFixed(2)}`}
              </div>
              <button
                onClick={handleCustomize}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              >
                {getButtonText()}
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">
                ${price.toFixed(2)}
              </span>
              
              <button
                onClick={handleAddToCart}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:scale-105"
              >
                Add to Cart 🛒
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pizza Customizer */}
      {(isPizza && !isBitsChickenWing) && showCustomizer && (
        <PizzaCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          pizzaName={name}
          baseId={id}
          isSpecial={isDailySpecial}
          specialPrice={isDailySpecial ? price : undefined}
        />
      )}

      {/* Bits Chicken Wing Pizza Customizer */}
      {isBitsChickenWing && showCustomizer && (
        <SpecialtyPizzaSauceCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          pizzaName={name}
          baseId={id}
          onComplete={handleSpecialtyPizzaComplete}
        />
      )}

      {/* Wings Customizer */}
      {isWings && showCustomizer && (
        <WingCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          itemName={name}
          basePrice={price}
          baseId={id}
        />
      )}

      {/* Calzone Customizer (3 toppings) */}
      {isCalzone && showCustomizer && (
        <ToppingCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          itemName={name}
          basePrice={price}
          baseId={id}
          maxToppings={3}
        />
      )}

      {/* Pizza Boat Customizer (2 toppings) */}
      {isPizzaBoat && showCustomizer && (
        <ToppingCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          itemName={name}
          basePrice={price}
          baseId={id}
          maxToppings={2}
        />
      )}

      {/* Rip & Dip Customizer (1 topping) */}
      {isRipDip && showCustomizer && (
        <ToppingCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          itemName={name}
          basePrice={price}
          baseId={id}
          maxToppings={1}
        />
      )}

      {/* Single Meat Sub Customizer */}
      {isSingleMeatSub && showCustomizer && (
        <SubMeatCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          baseId={id}
        />
      )}

      {/* Fountain Drink Customizer */}
      {isFountainDrink && showCustomizer && (
        <DrinkCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          baseId={id}
          itemType="fountain"
        />
      )}

      {/* Bottle Drink Customizer */}
      {isBottleDrink && showCustomizer && (
        <DrinkCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          baseId={id}
          itemType="bottle"
        />
      )}

      {/* 2 Liter Drink Customizer */}
      {is2LiterDrink && showCustomizer && (
        <DrinkCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          baseId={id}
          itemType="2liter"
        />
      )}

      {/* Salad Customizer */}
      {isSalad && showCustomizer && (
        <SaladCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          saladName={name}
          basePrice={price}
          baseId={id}
        />
      )}
    </>
  );
}