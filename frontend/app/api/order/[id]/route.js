import { connectToDb } from "@/utils/database";

import User from '@/models/users';
import Order from '@/models/order';
import Product from '@/models/product';

export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        const order = await Order.findById(params.id)
        if (!order) return new Response("Order Not Found", { status: 404 });

        return new Response(JSON.stringify(order), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (request, { params }) => {
    try {
        const { productId } = await request.json();
        await connectToDb();

        // Find the returned order by ID
        const order = await Order.findById(params.id)
        if (!order) return new Response("Order Not Found", { status: 404 })

        // Update the order with status closed
        order.status = "closed";
        await order.save();

        // Find the returned order's product  by ID
        const product = await Product.findById(productId);
        if (!product) return new Response("Product Not Found", { status: 404 })

        // Update the product with status returned
        product.status = "returned";
        await product.save();

        return new Response("Order and product updated successfully", { status: 200 });
    }
    catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { status } = await request.json();

    try {
        await connectToDb();

        // Find the existing order by ID
        const existingOrder = await Order.findById(params.id);

        if (!existingOrder) {
            return new Response("Order not found", { status: 404 });
        }

        // Update the order with new data
        existingOrder.status = status;

        await existingOrder.save();

        return new Response("Successfully updated the Order", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Order", { status: 500 });
    }
};

