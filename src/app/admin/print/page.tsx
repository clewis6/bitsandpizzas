'use client';

import { useState, useEffect, useRef } from 'react';

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
    phone: string;
    specialInstructions?: string;
    paymentMethod: 'card' | 'cash';
  };
  status: string;
  timestamp: string;
}

export default function PrintStation() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const printedOrders = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkForNewOrders = () => {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const currentOrders: Order[] = JSON.parse(stored);
        
        // Check for new orders
        const newOrders = currentOrders.filter(
          order => !printedOrders.current.has(order.id)
        );

        if (newOrders.length > 0) {
          // Auto-print new orders
          newOrders.forEach(order => {
            printedOrders.current.add(order.id);
          });
          
          setOrders(currentOrders);
          setLastOrderCount(currentOrders.length);
          
          // Trigger print after a short delay to ensure rendering
          setTimeout(() => {
            window.print();
          }, 500);
        } else {
          setOrders(currentOrders);
        }
      }
    };

    // Check immediately
    checkForNewOrders();
    
    // Check every 3 seconds for new orders
    const interval = setInterval(checkForNewOrders, 3000);
    
    return () => clearInterval(interval);
  }, [lastOrderCount]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const newOrders = orders.filter(order => order.status === 'received');

  return (
    <div className="print-container">
      {/* Screen View - Not Printed */}
      <div className="no-print bg-warm-gradient min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-yellow-300 mb-4">
              🖨️ Auto-Print Station
            </h1>
            <p className="text-gray-300 mb-4">
              This page automatically detects new orders and prints them.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400">{newOrders.length}</div>
                  <div className="text-gray-400">New Orders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">{orders.length}</div>
                  <div className="text-gray-400">Total Orders</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              ⏱️ Checking for new orders every 3 seconds...
            </p>
            <p className="text-sm text-yellow-300 mt-2">
              💡 Keep this page open on a device connected to your printer
            </p>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Recent Orders</h2>
            {newOrders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Waiting for new orders...</p>
            ) : (
              <div className="space-y-4">
                {newOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white">{order.id}</span>
                      <span className="text-green-400 text-sm">NEW</span>
                    </div>
                    <p className="text-gray-300 text-sm">{order.customerInfo.name}</p>
                    <p className="text-gray-400 text-sm">{formatTime(order.timestamp)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print View - Only Shows When Printing */}
      <div className="print-only">
        {newOrders.map((order) => (
          <div key={order.id} className="receipt-page">
            <div className="receipt">
              {/* Header */}
              <div className="receipt-header">
                <h1>BITS & PIZZAS</h1>
                <p>408 S Main Street</p>
                <p>Snowflake, AZ 85937</p>
                <p>Phone: (928) 536-4005</p>
              </div>

              <div className="divider">================================</div>

              {/* Order Info */}
              <div className="receipt-section">
                <h2>ORDER #{order.id}</h2>
                <p>Date: {formatTime(order.timestamp)}</p>
                <p>Type: PICKUP</p>
              </div>

              <div className="divider">================================</div>

              {/* Customer Info */}
              <div className="receipt-section">
                <h3>CUSTOMER:</h3>
                <p>{order.customerInfo.name}</p>
                <p>{order.customerInfo.phone}</p>
                <p>Payment: {order.customerInfo.paymentMethod.toUpperCase()}</p>
              </div>

              <div className="divider">================================</div>

              {/* Items */}
              <div className="receipt-section">
                <h3>ITEMS:</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="item-line">
                    <span className="item-qty">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="divider">================================</div>

              {/* Total */}
              <div className="receipt-section">
                <div className="total-line">
                  <span>TOTAL:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Special Instructions */}
              {order.customerInfo.specialInstructions && (
                <>
                  <div className="divider">================================</div>
                  <div className="receipt-section special-instructions">
                    <h3>SPECIAL INSTRUCTIONS:</h3>
                    <p>{order.customerInfo.specialInstructions}</p>
                  </div>
                </>
              )}

              <div className="divider">================================</div>

              {/* Footer */}
              <div className="receipt-footer">
                <p>Thank you for your order!</p>
                <p>Estimated time: 20-45 minutes</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Hide print view on screen */
        .print-only {
          display: none;
        }

        /* Print styles */
        @media print {
          /* Hide everything except print view */
          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          /* Receipt styling */
          .receipt-page {
            page-break-after: always;
            width: 100%;
            max-width: 3in; /* Thermal printer width */
            margin: 0 auto;
          }

          .receipt {
            font-family: 'Courier New', monospace;
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
            background: #fff;
          }

          .receipt-header {
            text-align: center;
            margin-bottom: 10px;
          }

          .receipt-header h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 0 0 5px 0;
          }

          .receipt-header p {
            margin: 2px 0;
            font-size: 10pt;
          }

          .divider {
            margin: 8px 0;
            font-size: 10pt;
          }

          .receipt-section {
            margin: 10px 0;
          }

          .receipt-section h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 5px 0;
            text-align: center;
          }

          .receipt-section h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 5px 0;
          }

          .receipt-section p {
            margin: 3px 0;
            font-size: 11pt;
          }

          .item-line {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 11pt;
          }

          .item-qty {
            width: 30px;
          }

          .item-name {
            flex: 1;
            padding: 0 5px;
          }

          .item-price {
            text-align: right;
            min-width: 60px;
          }

          .total-line {
            display: flex;
            justify-content: space-between;
            font-size: 14pt;
            font-weight: bold;
            margin: 5px 0;
          }

          .total-amount {
            font-size: 16pt;
          }

          .special-instructions {
            background: #f0f0f0;
            padding: 5px;
            border: 2px solid #000;
          }

          .special-instructions h3 {
            margin-top: 0;
          }

          .receipt-footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10pt;
          }

          .receipt-footer p {
            margin: 3px 0;
          }

          /* Ensure clean page breaks */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        /* Screen styles */
        @media screen {
          .print-container {
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  );
}
