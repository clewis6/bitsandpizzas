'use client';

import MenuItemCard from '../components/MenuItemCard';

// Real Bits & Pizzas menu data based on actual menu photos
const menuItems = [
  // PIZZA - Traditional Cheese Pizza
  {
    id: '1',
    name: 'Traditional Cheese Pizza',
    description: '10" Small $9.99 | 12" Medium $11.99 | 14" Large $15.99 | 16" X-Large $17.99 | 18" Family $23.99',
    price: 11.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Each Topping',
    description: 'Small $1.10 | Medium $1.49 | Large $1.99 | X-Large $1.99 | Family $2.49',
    price: 1.49,
    image: '/api/placeholder/300/200',
    category: 'Pizza'
  },
  
  // SPECIALTY PIZZAS (6 toppings)
  {
    id: '3',
    name: 'Specialty Pizza',
    description: 'Choice of 6 toppings. 10" Small $14.99 | 12" Medium $18.49 | 14" Large $21.99 | 16" X-Large $23.99',
    price: 18.49,
    image: '/api/placeholder/300/200',
    category: 'Specialty Pizzas'
  },
  
  // PIZZA BY THE SLICE
  {
    id: '4',
    name: 'Pizza By the Slice',
    description: 'Single slice of cheese pizza - perfect for a quick bite!',
    price: 3.50,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Pizza'
  },
  {
    id: '5',
    name: 'Lunch Special',
    description: 'One slice and a small drink',
    price: 5.00,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Daily Specials'
  },

  // SPECIALTY PIZZAS - Named varieties
  {
    id: '6',
    name: 'Bits Chicken Wing Pizza (5 toppings)',
    description: 'Chicken and Bacon, your choice BBQ or Hot! 12" Medium $14.99 | 14" Large $18.99 | 16" X-Large $19.99',
    price: 14.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas'
  },
  {
    id: '7',
    name: 'Meat Lovers Pizza (6 toppings)',
    description: 'Pepperoni, Ham, Sausage, Ground Beef. 12" Medium $15.99 | 14" Large $19.99 | 16" X-Large $22.99 | 18" Family $26.49',
    price: 15.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas'
  },
  {
    id: '8',
    name: 'Vegetarian Pizza (6 toppings)',
    description: 'Black Olives, Green Olives, Red Onion, Bell Pepper, Tomatoes, Mushrooms. 12" Medium $15.99 | 14" Large $19.99 | 16" X-Large $22.99 | 18" Family $26.49',
    price: 15.99,
    image: '/api/placeholder/300/200',
    category: 'Specialty Pizzas'
  },
  {
    id: '9',
    name: 'Supreme Pizza (8 toppings)',
    description: 'Pepperoni, Ham, Sausage, Ground Beef, Black Olives, Green Olives, Bell Pepper, Mushrooms. 12" Medium $17.99 | 14" Large $21.99 | 16" X-Large $24.99 | 18" Family $29.99',
    price: 17.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty Pizzas'
  },
  
  // TOPPINGS
  {
    id: '10',
    name: 'Available Toppings',
    description: 'Pepperoni, Sausage, Ground Beef, Ham, Bacon, Chicken, Green Chile, Jalapeños, Black Olives, Green Olives, Mushrooms, Bell Pepper, Pineapple, Tomato, Red Onion, Mushrooms',
    price: 0,
    image: '/api/placeholder/300/200',
    category: 'Pizza'
  },

  // WINGS
  {
    id: '11',
    name: 'Hot Wings (Sauce: BBQ or Teriyaki)',
    description: 'Delicious wings with your choice of sauce.',
    price: 1.40,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Wings'
  },

  // BREADSTIX
  {
    id: '12',
    name: 'Regular Cinnamon Breadstix',
    description: 'Small $5.99 | Large $7.99',
    price: 5.99,
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Breadstix'
  },
  {
    id: '13',
    name: 'Cheese Breadstix',
    description: 'Small $8.99 | Large $10.99',
    price: 8.99,
    image: '/api/placeholder/300/200',
    category: 'Breadstix'
  },

  // SALADS
  {
    id: '14',
    name: 'Tossed Green Salad',
    description: 'Fresh mixed greens with vegetables.',
    price: 3.99,
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },
  {
    id: '15',
    name: 'Zesty Chef Salad',
    description: 'Loaded with meats, cheese, and fresh vegetables.',
    price: 9.49,
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },

  // SUBS
  {
    id: '16',
    name: 'New York Special Sub',
    description: 'Pepperoni, Ham, Salami and Sausage. Small $7.99 | Large $9.99',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Subs'
  },
  {
    id: '17',
    name: 'Ham, Salami, or Pepperoni Sub',
    description: 'Your choice of meat. Small $6.99 | Large $8.99',
    price: 6.99,
    image: '/api/placeholder/300/200',
    category: 'Subs'
  },

  // CALZONES
  {
    id: '18',
    name: 'Calzone',
    description: 'Choice of 3 Toppings',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Calzones'
  },

  // PIZZA BOAT
  {
    id: '19',
    name: 'Pizza Boat',
    description: 'Like our personal size pizza but in a boat! Choice of 2 Toppings',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Pizza Boat'
  },

  // RIP & DIP
  {
    id: '20',
    name: 'Rip & Dip',
    description: 'Choice of 1 Topping',
    price: 7.99,
    image: '/api/placeholder/300/200',
    category: 'Rip & Dip'
  },

  // SODA BAR
  {
    id: '21',
    name: 'Soda Bar',
    description: 'Small $1.39 | Medium $1.69 | Large $1.99 | X-Large $2.19 | Commercial Mug $0.99 | 20 oz. Sodas $3.39 | 2 Liter Sodas $3.99',
    price: 1.69,
    image: '/api/placeholder/300/200',
    category: 'Beverages'
  },

  // DAILY SPECIALS (from board in photo)
  {
    id: '22',
    name: 'Monday Special',
    description: 'Family Size One Item Pizza',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '23',
    name: 'Tuesday Special',
    description: 'Medium Supreme Pizza and an Ex-Large One Item Pizza',
    price: 32.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '24',
    name: 'Wednesday Special',
    description: 'Two Medium One Item Pizzas',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '25',
    name: 'Thursday Special',
    description: 'Ex-Large One Item Pizza',
    price: 16.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '26',
    name: 'Friday Special',
    description: 'Family Size One Item Pizza',
    price: 18.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '27',
    name: 'Saturday Special',
    description: 'Ex-Large One Item Pizza',
    price: 16.99,
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  }
];

export default function Menu() {
  const categories = ['Pizza', 'Specialty Pizzas', 'Wings', 'Breadstix', 'Salads', 'Subs', 'Calzones', 'Pizza Boat', 'Rip & Dip', 'Beverages', 'Daily Specials'];
  
  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
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
          const categoryItems = getItemsByCategory(category);
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category} className="mb-16">
              <h2 className="text-4xl font-bold text-yellow-300 mb-8 text-center">
                {category}
              </h2>
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
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Hours & Contact Info */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center">
            Hours & Daily Specials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">🕐 Hours</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Monday-Thursday: 11am - 9pm</li>
                <li>• Friday-Saturday: 11am - 9pm</li>
                <li>• Birthday Parties & Game Room Available</li>
                <li>• Daily Specials</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">🌟 Daily Specials</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Monday: Family Size Pizza Deal</li>
                <li>• Tuesday: Extra Large Pizza Special</li>
                <li>• Wednesday: Two Medium Pizza Deal</li>
                <li>• Thursday: Extra Large Pizza + 2 Items</li>
                <li>• Friday: Family Size Pizza Special</li>
                <li>• Daily Lunch Special: Slice of Pizza and a Drink</li>
              </ul>
            </div>
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
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">🏃 Pickup Times</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Typical pickup time: 15-20 minutes</li>
              <li>• Peak hours: 20-30 minutes</li>
              <li>• We&apos;ll have your order ready and hot!</li>
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