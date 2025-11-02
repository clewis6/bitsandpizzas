import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-pizza-gradient min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="animate-fadeIn">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
              <Image
                src="/logo.png"
                alt="Bits & Pizzas Logo"
                fill
                className="object-contain animate-bounceIn"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-yellow-300">
            Bits & Pizzas
          </h1>
          <h2 className="text-2xl md:text-4xl mb-8 text-white">
            Locally Loved for 40 Years 🍕
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
            From classic pepperoni to our legendary Pizza Generator creations - 
            we've been serving up smiles and slices since 1984!
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/menu">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 animate-glow shadow-2xl">
                🍕 Order Now
              </button>
            </Link>
            
            <Link href="/generator">
              <button className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 shadow-2xl">
                🎲 Try the Pizza Generator
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 p-8 rounded-xl text-center animate-fadeIn shadow-xl">
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Wood-Fired Fresh</h3>
            <p className="text-gray-300">
              Every pizza is cooked in our traditional wood-fired oven for that perfect crispy crust and smoky flavor.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 p-8 rounded-xl text-center animate-fadeIn shadow-xl">
            <div className="text-6xl mb-4">🎲</div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Pizza Generator</h3>
            <p className="text-gray-300">
              Can't decide? Let our famous Pizza Generator create a unique combination just for you. It's gone viral for a reason!
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 p-8 rounded-xl text-center animate-fadeIn shadow-xl">
            <div className="text-6xl mb-4">🚚</div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Fast Delivery</h3>
            <p className="text-gray-300">
              Hot, fresh pizzas delivered to your door in 30 minutes or less. We're faster than your ex's excuses!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300">
          What People Say
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl animate-fadeIn">
            <div className="text-yellow-300 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">
              "The Pizza Generator gave me 'Pineapple Bacon Jalapeño Madness' and it was actually incredible! Who knew chaos could taste so good?"
            </p>
            <p className="text-yellow-300 font-bold">- Sarah M.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl animate-fadeIn">
            <div className="text-yellow-300 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">
              "Been coming here for 20 years. Best pizza in town, hands down. The staff knows my order by heart!"
            </p>
            <p className="text-yellow-300 font-bold">- Mike R.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl animate-fadeIn">
            <div className="text-yellow-300 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">
              "My kids are obsessed with the Pizza Generator. It's like a game that ends with dinner!"
            </p>
            <p className="text-yellow-300 font-bold">- Jennifer K.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-gray-900 p-12 rounded-2xl animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300">
            Ready for Pizza Perfection?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of satisfied customers who've made us their go-to pizza spot.
          </p>
          <Link href="/menu">
            <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-xl text-2xl font-bold transition-all duration-300 hover:scale-110 animate-glow shadow-2xl">
              Order Your Pizza Now 🍕
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
