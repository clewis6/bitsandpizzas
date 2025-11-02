import { NextResponse } from 'next/server';

// In-memory storage (resets on deployment - for demo purposes)
// For production, you'd use a real database
let orders: Array<{
  id: string;
  timestamp: number;
  customerName: string;
  customerPhone: string;
  items: Array<{ name: string; price: number }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}> = [];

// GET - Fetch all orders or recent orders
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hours = searchParams.get('hours');
  
  if (hours) {
    // Get orders from last X hours
    const hoursAgo = Date.now() - (parseInt(hours) * 60 * 60 * 1000);
    const recentOrders = orders.filter(order => order.timestamp > hoursAgo);
    
    return NextResponse.json({
      orders: recentOrders,
      count: recentOrders.length,
      isPeak: recentOrders.length > 10 // If more than 10 orders in timeframe, it's peak
    });
  }
  
  return NextResponse.json({ orders, count: orders.length });
}

// POST - Create new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      items: body.items,
      total: body.total,
      status: 'pending' as const
    };
    
    orders.push(newOrder);
    
    // Keep only last 100 orders to prevent memory issues
    if (orders.length > 100) {
      orders = orders.slice(-100);
    }
    
    return NextResponse.json({ 
      success: true, 
      order: newOrder,
      orderNumber: newOrder.id
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// PATCH - Update order status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }
    
    orders[orderIndex].status = status;
    
    return NextResponse.json({ 
      success: true, 
      order: orders[orderIndex]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
