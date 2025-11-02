'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-red-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image
                src="/logo.webp"
                alt="Bits & Pizzas Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl hover:text-yellow-300 transition-colors">
              Bits & Pizzas
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/menu" 
              className="hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              Menu
            </Link>
            <Link 
              href="/studio" 
              className="hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              Pizza Studio 🧑‍🍳
            </Link>
            <Link 
              href="/generator" 
              className="hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              Pizza Generator 🎲
            </Link>
            <Link 
              href="/checkout" 
              className="hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              Checkout
            </Link>
            <Link 
              href="/admin" 
              className="hover:text-yellow-300 transition-colors font-medium text-lg"
            >
              Kitchen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-red-600">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/menu" 
                className="hover:text-yellow-300 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/studio" 
                className="hover:text-yellow-300 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Pizza Studio 🧑‍🍳
              </Link>
              <Link 
                href="/generator" 
                className="hover:text-yellow-300 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Pizza Generator 🎲
              </Link>
              <Link 
                href="/checkout" 
                className="hover:text-yellow-300 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Checkout
              </Link>
              <Link 
                href="/admin" 
                className="hover:text-yellow-300 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Kitchen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}