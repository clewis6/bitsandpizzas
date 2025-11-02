'use client';

import { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useRouter } from 'next/navigation';

interface OrderData {
  name: string;
  email: string;
  phone: string;
  orderType: 'pickup';
  paymentMethod: 'card' | 'cash';
  specialInstructions?: string;
}

export default function Checkout() {
  const { items, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData>({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup',
    paymentMethod: 'cash',
    specialInstructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      // Create fake order for admin dashboard
      const order = {
        id: `ORDER-${Date.now()}`,
        items,
        total,
        customerInfo: orderData,
        status: 'received',
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for admin dashboard
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

      clearCart();
      setIsSubmitting(false);
      router.push('/admin');
    }, 2000);
  };

  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  if (items.length === 0) {
    return (
      <div className="bg-warm-gradient min-h-screen py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8 text-yellow-300">Your Cart is Empty! 🛒</h1>
          <p className="text-xl text-gray-200 mb-8">
            Looks like you haven&apos;t added any delicious pizzas yet.
          </p>
          <div className="space-y-4">
            <a
              href="/menu"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 inline-block mr-4"
            >
              Browse Menu 🍕
            </a>
            <a
              href="/generator"
              className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 inline-block"
            >
              Try Pizza Generator 🎲
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warm-gradient min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-yellow-300 text-center animate-fadeIn">
          Checkout 🛒
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6">Your Order</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-gray-300">${item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm ml-2"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="text-white font-bold ml-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Tax (8%):</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-yellow-300 border-t border-gray-600 pt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">🏃 Pickup at 408 S Main St, Snowflake, AZ</p>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6">Order Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div>
                <label className="block text-white font-bold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-300 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-300 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-300 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Order Type - Pickup Only */}
              <div className="bg-yellow-300 text-black p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🏃</span>
                  <div>
                    <p className="font-bold text-lg">Pickup Only</p>
                    <p className="text-sm">We currently offer pickup service at our Snowflake location</p>
                    <p className="text-xs mt-1">� 408 South Main Street, Snowflake, AZ 85937</p>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-white font-bold mb-2">Special Instructions (Optional)</label>
                <textarea
                  name="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-300 focus:outline-none"
                  placeholder="Any special requests for your order?"
                  rows={3}
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-white font-bold mb-2">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={orderData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-300 focus:outline-none"
                >
                  <option value="cash">� Cash (Pay at Pickup)</option>
                  <option value="card">� Credit/Debit Card (Pay at Pickup)</option>
                </select>
              </div>

              {/* Payment Notice */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-yellow-300 font-bold mb-2">💳 Payment</p>
                <p className="text-gray-300 text-sm">
                  Payment will be collected when you pick up your order at our Snowflake location.
                  This online ordering system is new - we&apos;re excited to serve you better!
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-xl text-xl font-bold transition-all duration-300
                  ${isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 hover:scale-105 animate-glow'
                  }
                  text-white
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-3">🍕</span>
                    Processing Order...
                  </span>
                ) : (
                  `Place Order for Pickup - $${finalTotal.toFixed(2)} 🍕`
                )}
              </button>
            </form>

            {/* Pickup Info */}
            <div className="mt-6 bg-yellow-300 text-black p-4 rounded-lg">
              <p className="font-bold text-center mb-2">
                � First time offering online ordering!
              </p>
              <p className="text-sm text-center">
                Pick up your order at 408 S Main Street, Snowflake, AZ 85937
              </p>
              <p className="text-xs text-center mt-1">
                📞 Questions? Call us at (928) 536-4005
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}