'use client';

import MenuItemCard from '../components/MenuItemCard';

// Real Bits & Pizzas menu data based on actual photo of menu
const menuItems = [
  // Traditional Pizzas (based on visible menu prices)
  {
    id: '1',
    name: 'Cheese Pizza',
    description: 'Classic cheese pizza with our signature sauce and mozzarella. Medium $11.99 | Large $15.99',
    price: 11.99, // Medium price from actual menu
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Traditional'
  },
  {
    id: '2',
    name: 'Each Topping', 
    description: 'Add any topping to your pizza. Medium +$1.50 | Large +$1.99',
    price: 1.50, // Medium topping price from actual menu
    image: '/api/placeholder/300/200',
    category: 'Add-Ons'
  },
  {
    id: '3',
    name: 'Pepperoni Pizza',
    description: 'Traditional pepperoni with cheese and our signature sauce.',
    price: 13.49, // Cheese + pepperoni topping
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Traditional'
  },
  {
    id: '4',
    name: 'Meat Lovers Pizza',
    description: 'Loaded with pepperoni, sausage, ham, and bacon. A carnivore\'s dream!',
    price: 17.99, // Based on specialty pizza pricing from photo
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Specialty'
  },
  {
    id: '5',
    name: 'Vegetarian Supreme',
    description: 'Fresh vegetables including peppers, onions, mushrooms, olives, and tomatoes.',
    price: 16.99, // Based on specialty pricing
    image: '/api/placeholder/300/200',
    category: 'Specialty'
  },
  {
    id: '6',
    name: 'Supreme Pizza',
    description: 'The works! Pepperoni, sausage, peppers, onions, mushrooms, olives.',
    price: 18.99, // Premium specialty pricing
    image: '/api/placeholder/300/200',
    category: 'Specialty'
  },
  // Breadstix (visible on menu)
  {
    id: '7',
    name: 'Breadstix',
    description: 'Fresh baked breadsticks with garlic butter and marinara sauce.',
    price: 5.99, // Based on menu photo
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Appetizers'
  },
  {
    id: '8',
    name: 'Cheese Breadstix',
    description: 'Our famous breadsticks topped with melted mozzarella cheese.',
    price: 6.99, // Upgrade from regular breadstix
    image: '/api/placeholder/300/200',
    category: 'Appetizers'
  },
  // Wings (visible on menu)
  {
    id: '9',
    name: 'Hot Wings',
    description: 'Spicy buffalo wings served with ranch dipping sauce.',
    price: 8.99, // From menu photo
    image: '/api/placeholder/300/200',
    category: 'Wings'
  },
  {
    id: '10',
    name: 'BBQ Wings',
    description: 'Tangy BBQ glazed wings with your choice of dipping sauce.',
    price: 8.99,
    image: '/api/placeholder/300/200',
    category: 'Wings'
  },
  {
    id: '11',
    name: 'Teriyaki Wings',
    description: 'Sweet teriyaki glazed wings - customer favorite!',
    price: 9.49, // Slight premium for teriyaki
    image: '/api/placeholder/300/200',
    category: 'Wings'
  },
  // Salads (visible on menu)
  {
    id: '12',
    name: 'Tossed Green Salad',
    description: 'Fresh mixed greens with tomatoes, cucumbers, and your choice of dressing.',
    price: 2.49, // From menu photo
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },
  {
    id: '13',
    name: 'Zesty Chef Salad',
    description: 'Mixed greens topped with ham, turkey, cheese, tomatoes, and vegetables.',
    price: 4.99, // From menu photo
    image: '/api/placeholder/300/200',
    category: 'Salads'
  },
  // Beverages (visible on menu)
  {
    id: '14',
    name: 'Soda Bar',
    description: 'All-you-can-drink fountain beverages including Coca-Cola products.',
    price: 1.89, // From menu photo
    image: '/api/placeholder/300/200',
    category: 'Beverages'
  },
  // Daily Specials (visible on menu board)
  {
    id: '15',
    name: 'Monday Special',
    description: 'Family Size, One Item Pizza - Great for families!',
    price: 14.49, // From daily specials board
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '16',
    name: 'Tuesday Special', 
    description: 'Medium Specialty Pizza with Extra Large One Item Pizza.',
    price: 19.49, // From daily specials board
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '17',
    name: 'Wednesday Special',
    description: 'Two Medium One Item Pizzas - Perfect for sharing!',
    price: 14.49, // From daily specials board
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '18',
    name: 'Thursday Special',
    description: 'Extra Large One Item Pizza - Feeds the whole family!',
    price: 13.49, // From daily specials board
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '19',
    name: 'Friday Special',
    description: 'Family Size One Item Pizza - End the week right!',
    price: 14.49, // From daily specials board
    image: '/api/placeholder/300/200',
    category: 'Daily Specials'
  },
  {
    id: '20',
    name: 'Daily Lunch Special',
    description: 'Slice of Pizza and a Drink - Perfect quick lunch!',
    price: 2.00, // From menu board
    image: '/api/placeholder/300/200',
    isPopular: true,
    category: 'Daily Specials'
  }
];

export default function Menu() {
  const categories = ['Traditional', 'Specialty', 'Appetizers', 'Wings', 'Salads', 'Beverages', 'Daily Specials'];
  
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
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">🕐 Delivery Times</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Standard Delivery: 25-35 minutes</li>
              <li>• Peak Hours: 35-45 minutes</li>
              <li>• Pickup: 15-20 minutes</li>
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