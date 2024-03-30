import Product from "@/models/product";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });


export async function POST(req) {//isko post request bana do
    const { product_id } = await req.json();
    

    const product = await Product.findById(product_id);
    if (!product) return new Response("Product Not Found", { status: 404 });
    console.log(product.creator);

    const payment_capture = 1;
    console.log("Total Price"+product.price);
    const amount = product.price * 70; // amount in paisa. In our case it's INR 1
    console.log("reduced Price "+(amount).toString());
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor: "testingDemo",
            userId: product.creator,
            productId: product_id
        }
    };

   const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success",order });
}


// export async function POST(req) {
//   const body = await req.json();


//   return NextResponse.json({ msg: body });
// }