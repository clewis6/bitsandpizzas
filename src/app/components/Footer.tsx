import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.webp"
                alt="Bits & Pizzas Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-yellow-300">Bits & Pizzas</h2>
          </div>
          <p className="text-gray-400 italic">Locally Loved for 40 Years 🍕</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Contact Us</h3>
            <div className="space-y-2">
              <p>📍 408 South Main Street</p>
              <p>Snowflake, Arizona 85937</p>
              <p>📞 928-536-4005</p>
              <p>✉️ hello@bitsnpizzas.com</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Hours</h3>
            <div className="space-y-2">
              <p>Mon-Thu: 11am - 9pm</p>
              <p>Fri-Sat: 11am - 9pm</p>
              <p>Game Room & Birthday Parties</p>
              <p>Daily Specials Available</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">About</h3>
            <div className="space-y-2">
              <p>Locally Loved for 40 Years 🍕</p>
              <p className="text-sm text-gray-300 italic">
                "Powered by dough, cheese, and chaos."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Bits & Pizzas. All rights reserved. | Made with ❤️ and lots of cheese
          </p>
        </div>
      </div>
    </footer>
  );
}