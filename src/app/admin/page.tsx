'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    orderType: 'delivery' | 'pickup';
    paymentMethod: 'card' | 'cash';
  };
  status: 'received' | 'in-progress' | 'ready' | 'completed';
  timestamp: string;
}

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedTab, setSelectedTab] = useState<'pending' | 'completed'>('pending');

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      const stored = localStorage.getItem('orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    };

    loadOrders();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Play a notification sound (in a real app)
    if (newStatus === 'ready') {
      // Here you would play a notification sound
      console.log('🔔 Order ready notification!');
    }
  };

  const getOrdersByStatus = () => {
    if (selectedTab === 'pending') {
      return orders.filter(order => ['received', 'in-progress'].includes(order.status));
    }
    return orders.filter(order => ['ready', 'completed'].includes(order.status));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-600';
      case 'in-progress': return 'bg-yellow-600';
      case 'ready': return 'bg-green-600';
      case 'completed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeElapsed = (timestamp: string) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const hours = Math.floor(diffMins / 60);
    return `${hours}h ${diffMins % 60}m ago`;
  };

  return (
    <div className="bg-warm-gradient min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.webp"
                  alt="Bits & Pizzas Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold text-yellow-300">
                Kitchen Dashboard
              </h1>
            </div>
            <div className="text-white">
              <div className="text-sm text-gray-300">Current Time</div>
              <div className="text-xl font-bold">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-400">
              {orders.filter(o => o.status === 'received').length}
            </div>
            <div className="text-gray-300">New Orders</div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {orders.filter(o => o.status === 'in-progress').length}
            </div>
            <div className="text-gray-300">In Progress</div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400">
              {orders.filter(o => o.status === 'ready').length}
            </div>
            <div className="text-gray-300">Ready</div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-gray-400">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-gray-300">Completed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`px-6 py-3 rounded-l-xl font-bold ${
              selectedTab === 'pending' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pending Orders ({orders.filter(o => ['received', 'in-progress'].includes(o.status)).length})
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`px-6 py-3 rounded-r-xl font-bold ${
              selectedTab === 'completed' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Completed ({orders.filter(o => ['ready', 'completed'].includes(o.status)).length})
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {getOrdersByStatus().length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🍕</div>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                {selectedTab === 'pending' ? 'No pending orders' : 'No completed orders'}
              </h3>
              <p className="text-gray-300">
                {selectedTab === 'pending' 
                  ? 'Waiting for new orders to come in...' 
                  : 'No completed orders yet today'
                }
              </p>
            </div>
          ) : (
            getOrdersByStatus().map((order) => (
              <div key={order.id} className="bg-gray-900 rounded-xl p-6 animate-fadeIn">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{order.id}</h3>
                    <p className="text-gray-300">{formatTime(order.timestamp)}</p>
                    <p className="text-sm text-gray-400">{getTimeElapsed(order.timestamp)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-yellow-300 mb-2">Customer:</h4>
                  <p className="text-white">{order.customerInfo.name}</p>
                  <p className="text-gray-300 text-sm">{order.customerInfo.phone}</p>
                  <p className="text-gray-300 text-sm">
                    {order.customerInfo.orderType === 'delivery' ? '🚚' : '🏃'} 
                    {order.customerInfo.orderType.charAt(0).toUpperCase() + order.customerInfo.orderType.slice(1)}
                  </p>
                  {order.customerInfo.orderType === 'delivery' && (
                    <p className="text-gray-300 text-sm mt-1">{order.customerInfo.address}</p>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-bold text-yellow-300 mb-2">Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm mb-1">
                      <span className="text-white">{item.quantity}x {item.name}</span>
                      <span className="text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-yellow-300">Total:</span>
                      <span className="text-yellow-300">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {order.status === 'received' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'in-progress')}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-bold transition-colors"
                    >
                      Start Cooking 🔥
                    </button>
                  )}
                  
                  {order.status === 'in-progress' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-colors"
                    >
                      Mark Ready 🍕
                    </button>
                  )}
                  
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors"
                    >
                      Complete Order ✅
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-900 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => {
                localStorage.removeItem('orders');
                setOrders([]);
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors"
            >
              🗑️ Clear All Orders
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors">
              📊 View Reports
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-400">
          <p>Kitchen Dashboard - Auto-refreshes every 5 seconds</p>
          <p className="text-sm">🎭 Demo Mode - No real orders being processed</p>
        </div>
      </div>
    </div>
  );
}