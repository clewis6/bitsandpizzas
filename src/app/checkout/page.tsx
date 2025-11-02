'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useRouter } from 'next/navigation';
import { usePeakHours } from '../hooks/usePeakHours';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CardPaymentForm from '../components/CardPaymentForm';

// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QRmf9P3EIyW7kqPi8qm3BWcHxL4r1XKa99yz2o5O87R6Lw8HRUmHGg2l7z3FNKz5KFa5N5qxVkN8Y3gO0lL0D4I00R7n8g7gZ');

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
  const peakStatus = usePeakHours();
  const [orderData, setOrderData] = useState<OrderData>({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup',
    paymentMethod: 'card',
    specialInstructions: ''
  });
  const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();
  
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  // Create payment intent when component loads
  useEffect(() => {
    if (!clientSecret && finalTotal > 0) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error('Error creating payment intent:', error));
    }
  }, [finalTotal, clientSecret]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardPaymentSuccess = async () => {
    try {
      // Submit order to backend API after successful payment
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: orderData.name,
          customerPhone: orderData.phone,
          items: items.map(item => ({
            name: item.name,
            price: item.price
          })),
          total: finalTotal,
          specialInstructions: orderData.specialInstructions,
          paymentMethod: 'card'
        })
      });

      const result = await response.json();

      if (result.success) {
        // Store in localStorage for admin dashboard
        const order = {
          id: result.orderNumber,
          items,
          total: finalTotal,
          customerInfo: orderData,
          status: 'received',
          timestamp: new Date().toISOString()
        };
        
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

        clearCart();
        router.push('/admin');
      } else {
        alert('Failed to submit order. Please try again or call us at (928) 536-4005');
      }
    } catch {
      alert('Error submitting order. Please call us at (928) 536-4005');
    }
  };

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
            
            <div className="space-y-6">
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

              {/* Card Payment Section */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">💳 Payment Information</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Complete your payment below to confirm your order.
                </p>
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CardPaymentForm 
                      onSuccess={handleCardPaymentSuccess}
                      onCancel={() => router.push('/menu')}
                      total={finalTotal}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin text-4xl mb-4">🍕</div>
                    <p className="text-gray-400">Loading payment form...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pickup Info */}
            <div className="mt-6 bg-yellow-300 text-black p-4 rounded-lg">
              <p className="font-bold text-center mb-2">
                🎉 First time offering online ordering!
              </p>
              <p className="text-sm text-center mb-2">
                Pick up your order at 408 S Main Street, Snowflake, AZ 85937
              </p>
              {!peakStatus.loading && (
                <>
                  <p className="text-sm text-center font-bold mb-1">
                    ⏱️ Estimated Pickup Time: {peakStatus.estimatedTime}
                  </p>
                  {peakStatus.isPeak && (
                    <p className="text-xs text-center text-red-600 font-bold">
                      🔥 We&apos;re busy right now! ({peakStatus.orderCount} recent orders)
                    </p>
                  )}
                  <p className="text-xs text-center mt-2 text-gray-700">
                    Please arrive at the estimated time shown above
                  </p>
                </>
              )}
              <p className="text-xs text-center mt-2">
                📞 Questions? Call us at (928) 536-4005
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}