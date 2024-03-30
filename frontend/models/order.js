import mongoose, { Schema, model, models } from "mongoose";
import User from "./users";
import Product from './product';

const OrderSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
      },
      status: { 
        type: String, 
        required: true 
      },
      shippingAddress: {
        type:String
      },
      paymentMethod: { type: String, required: true, default: "Stripe" },
      rate: { type: Number, required: true },
      numberOfDays: { type: Number },
      isPaid: { type: Boolean },
      paidAt: { type: Date },
      isProcessing: { type: Boolean },
    },
    { timestamps: true }
  );
  
  const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
  
  export default Order;
  