// pages/api/orders.js
import { NextResponse } from 'next/server';
import { pusherServer } from '@/libs/firebase';

export async function POST(req) {
  try {
    // Process and save the order details to the database
    // const { orderId, items, /* other order details */ } = req.body;
    const {  table } = await req.json();
    // console.log({ cartItems, table, dish });

    // Trigger a Pusher event to notify clients about the new order
    // await pusherServer.trigger('orders', 'newOrder', { orderId, cartItems });
    await pusherServer.trigger('orders', 'newOrder', { table });
    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('JSON Parsing Error:', error.message);
    return new NextResponse('Invalid JSON', { status: 400 });
  }
}
