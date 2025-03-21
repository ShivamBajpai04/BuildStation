import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    
    if (!amount) {
      return NextResponse.json({ 
        success: false, 
        message: "Amount is required" 
      }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
    });

    return NextResponse.json({ 
      success: true, 
      orderId: order.id 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Something went wrong with payment" 
    }, { status: 500 });
  }
}
