'use client';

import MenuItemCard from '../components/MenuItemCard';

// Real Bits & Pizzas menu data based on actual menu photos
const menuItems = [
  // PIZZA - Traditional Cheese Pizza (all sizes)
  {
    id: 'cheese-pizza',
    name: 'Traditional Cheese Pizza',
    description: 'Classic cheese pizza with our signature sauce and mozzarella',
    price: 7.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Pizza',
    sizes: {
      small: { size: '10"', price: 7.99 },
      medium: { size: '12"', price: 9.99 },
      large: { size: '14"', price: 13.99 },
      xlarge: { size: '16"', price: 17.99 },
      family: { size: '18"', price: 23.99 }
    }
  },
  
  // PIZZA BY THE SLICE
  {
    id: 'pizza-slice',
    name: 'Pizza By the Slice',
    description: 'Pepperoni slice - Perfect for a quick bite!',
    price: 3.50,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Pizza'
  },
  
  // LUNCH SPECIAL
  {
    id: 'lunch-special',
    name: 'Daily Lunch Special',
    description: 'Slice of Pepperoni Pizza and a Drink - Available daily!',
    price: 5.00,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Daily Specials'
  },

  // SPECIALTY PIZZAS
  {
    id: 'bits-chicken-wing',
    name: 'Bits Chicken Wing Pizza',
    description: 'Chicken and Bacon, your choice BBQ or Hot! (5 toppings)',
    price: 11.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas',
    sizes: {
      small: { size: '10"', price: 11.99 },
      medium: { size: '12"', price: 14.99 },
      large: { size: '14"', price: 16.99 },
      xlarge: { size: '16"', price: 18.99 }
    }
  },
  {
    id: 'meat-lovers',
    name: 'Meat Lovers Pizza',
    description: 'Pepperoni, Ham, Sausage, Ground Beef (6 toppings)',
    price: 13.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas',
    sizes: {
      small: { size: '10"', price: 13.99 },
      medium: { size: '12"', price: 16.99 },
      large: { size: '14"', price: 22.99 },
      xlarge: { size: '16"', price: 26.49 }
    }
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Pizza',
    description: 'Black Olives, Green Olives, Red Onion, Bell Pepper, Tomatoes, Mushrooms (6 toppings)',
    price: 13.99,
    image: '/api/placeholder/300/200',
    category: 'Specialty Pizzas',
    sizes: {
      small: { size: '10"', price: 13.99 },
      medium: { size: '12"', price: 16.99 },
      large: { size: '14"', price: 22.99 },
      xlarge: { size: '16"', price: 26.49 }
    }
  },
  {
    id: 'supreme',
    name: 'Supreme Pizza',
    description: 'Pepperoni, Ham, Sausage, Ground Beef, Black Olives, Green Olives, Bell Pepper, Mushrooms (8 toppings)',
    price: 13.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas',
    sizes: {
      small: { size: '10"', price: 13.99 },
      medium: { size: '12"', price: 16.99 },
      large: { size: '14"', price: 22.99 },
      xlarge: { size: '16"', price: 26.49 }
    }
  },

  // WINGS
  {
    id: 'hot-wings',
    name: 'Hot Wings',
    description: 'BBQ or Teriyaki sauce - $1.40 each',
    price: 1.40,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Wings'
  },

  // BREADSTIX
  {
    id: 'regular-breadstix',
    name: 'Regular Cinnamon Breadstix',
    description: 'Fresh baked breadstix with cinnamon',
    price: 5.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Breadstix',
    sizes: {
      small: { price: 5.99 },
      large: { price: 7.99 }
    }
  },
  {
    id: 'cheese-breadstix',
    name: 'Cheese Breadstix',
    description: 'Our famous breadsticks topped with melted cheese',
    price: 8.99,
    image: '/api/placeholder/300/200',
    category: 'Breadstix',
    sizes: {
      small: { price: 8.99 },
      large: { price: 10.99 }
    }
  },

  // SALADS
  {
    id: 'tossed-salad',
    name: 'Tossed Green Salad',
    description: 'Fresh mixed greens with vegetables and your choice of dressing',
    price: 3.99,
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },
  {
    id: 'chef-salad',
    name: 'Zesty Chef Salad',
    description: 'Loaded with meats, cheese, and fresh vegetables',
    price: 9.49,
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },

  // SUBS
  {
    id: 'ny-special',
    name: 'New York Special Sub',
    description: 'Pepperoni, Ham, Salami and Sausage',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Subs',
    sizes: {
      small: { price: 7.99 },
      large: { price: 9.99 }
    }
  },
  {
    id: 'single-meat-sub',
    name: 'Ham, Salami, or Pepperoni Sub',
    description: 'Your choice of one meat',
    price: 6.99,
    image: '/api/placeholder/300/200',
    category: 'Subs',
    sizes: {
      small: { price: 6.99 },
      large: { price: 8.99 }
    }
  },

  // CALZONES
  {
    id: 'calzone',
    name: 'Calzone',
    description: 'Choice of 3 Toppings - folded and baked to perfection',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Calzones'
  },

  // PIZZA BOAT
  {
    id: 'pizza-boat',
    name: 'Pizza Boat',
    description: 'Like our personal size pizza but in a boat! Choice of 2 Toppings',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Pizza Boat'
  },

  // RIP & DIP
  {
    id: 'rip-dip',
    name: 'Rip & Dip',
    description: 'Choice of 1 Topping with dipping sauce',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Rip & Dip'
  },

  // SODA BAR
  {
    id: 'soda',
    name: 'Fountain Drinks',
    description: 'Coca-Cola products - Small $1.39 | Medium $1.69 | Large $1.99 | X-Large $2.19',
    price: 1.69,
    image: '/api/placeholder/300/200',
    category: 'Beverages'
  },
  {
    id: 'bottle-soda',
    name: '20 oz. Bottled Sodas',
    description: 'Variety of bottled beverages',
    price: 3.39,
    image: '/api/placeholder/300/200',
    category: 'Beverages'
  },
  {
    id: '2-liter',
    name: '2 Liter Sodas',
    description: 'Take home a 2 liter',
    price: 3.99,
    image: '/api/placeholder/300/200',
    category: 'Beverages'
  },

  // DAILY SPECIALS (from board)
  {
    id: 'monday-special',
    name: 'Monday Special',
    description: 'Family Size One Item Pizza',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: 'tuesday-special',
    name: 'Tuesday Special',
    description: 'Medium Supreme Pizza and an Ex-Large One Item Pizza',
    price: 32.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: 'wednesday-special',
    name: 'Wednesday Special',
    description: 'Two Medium One Item Pizzas',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: 'thursday-special',
    name: 'Thursday Special',
    description: 'Ex-Large One Item Pizza',
    price: 16.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: 'friday-special',
    name: 'Friday Special',
    description: 'Family Size One Item Pizza',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: 'saturday-special',
    name: 'Saturday Special',
    description: 'Ex-Large One Item Pizza',
    price: 16.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  }
];

export default function Menu() {
  const categories = [
    { name: 'Pizza', icon: '🍕', description: 'Build your own or grab a slice!' },
    { name: 'Specialty Pizzas', icon: '⭐', description: 'Our signature combinations' },
    { name: 'Daily Specials', icon: '🎉', description: 'Amazing deals every day' },
    { name: 'Wings', icon: '🍗', description: 'Hot, BBQ, or Teriyaki' },
    { name: 'Breadstix', icon: '🥖', description: 'Fresh baked goodness' },
    { name: 'Salads', icon: '🥗', description: 'Fresh and crisp' },
    { name: 'Subs', icon: '🥪', description: 'Loaded with flavor' },
    { name: 'Calzones', icon: '🌮', description: 'Folded and delicious' },
    { name: 'Pizza Boat', icon: '⛵', description: 'Personal pizza in a boat' },
    { name: 'Rip & Dip', icon: '🍴', description: 'Perfect for sharing' },
    { name: 'Beverages', icon: '🥤', description: 'Ice cold drinks' }
  ];
  
  const getItemsByCategory = (categoryName: string) => {
    return menuItems.filter(item => item.category === categoryName);
  };

  return (
    <div className="bg-warm-gradient min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-300 animate-fadeIn">
            Our Menu 🍕
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-4">
            Handcrafted pizzas made with love, fresh ingredients, and 40 years of perfected recipes.
            <strong className="text-yellow-300"> Now with online ordering for pickup!</strong>
          </p>
          <div className="bg-gray-900 p-4 rounded-xl inline-block">
            <p className="text-yellow-300 font-bold">
              📍 408 South Main Street, Snowflake, Arizona 85937
            </p>
            <p className="text-white">📞 928-536-4005</p>
          </div>
        </div>

        {/* Menu Categories */}
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.name);
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category.name} className="mb-20">
              {/* Category Header */}
              <div className="text-center mb-10">
                <div className="inline-block bg-gray-900 rounded-2xl px-8 py-4 shadow-xl">
                  <div className="text-5xl mb-2">{category.icon}</div>
                  <h2 className="text-4xl font-bold text-yellow-300 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    isPopular={item.isPopular}
                    category={item.category}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Hours & Info */}
        <div className="mt-20 bg-gray-900 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-yellow-300 text-center">
            📍 Visit Us in Snowflake, Arizona
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">🕐 Hours</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Thursday:</span>
                  <span className="font-bold">11am - 9pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday - Saturday:</span>
                  <span className="font-bold">11am - 9pm</span>
                </li>
                <li className="text-yellow-300 mt-4">🎮 Game Room Available</li>
                <li className="text-yellow-300">🎉 Birthday Parties Welcome</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">📞 Contact</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="text-lg">
                  <span className="text-yellow-300">Phone:</span><br/>
                  <a href="tel:9285364005" className="font-bold hover:text-yellow-300">(928) 536-4005</a>
                </li>
                <li className="text-lg">
                  <span className="text-yellow-300">Address:</span><br/>
                  <span className="font-bold">408 South Main Street</span><br/>
                  <span>Snowflake, AZ 85937</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Available Toppings */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">🍕 Available Toppings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-300">
              <div>• Pepperoni</div>
              <div>• Sausage</div>
              <div>• Ground Beef</div>
              <div>• Ham</div>
              <div>• Bacon</div>
              <div>• Chicken</div>
              <div>• Green Chile</div>
              <div>• Jalapeños</div>
              <div>• Black Olives</div>
              <div>• Green Olives</div>
              <div>• Mushrooms</div>
              <div>• Bell Pepper</div>
              <div>• Pineapple</div>
              <div>• Tomato</div>
              <div>• Red Onion</div>
            </div>
            <p className="text-center text-yellow-300 mt-4 font-bold">
              Small +$1.10 | Medium +$1.49 | Large +$1.99 | X-Large +$1.99 | Family +$2.49
            </p>
          </div>
        </div>

        {/* Generator CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900 p-8 rounded-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              Can&apos;t Decide? 🎲
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Let our famous Pizza Generator create something totally unique for you!
            </p>
            <a
              href="/generator"
              className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 inline-block"
            >
              Try the Pizza Generator 🎲
            </a>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">📍 Location</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• 408 South Main Street</li>
              <li>• Snowflake, AZ 85937</li>
              <li>• Pickup orders only</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">🌟 Size Options</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Personal (8&quot;): Perfect for one</li>
              <li>• Medium (12&quot;): Great for sharing</li>
              <li>• Large (16&quot;): Feed the family</li>
              <li>• XL (20&quot;): Party time!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}