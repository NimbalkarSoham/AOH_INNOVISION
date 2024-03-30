import Order from "@/models/order";
import User from "@/models/users";
import { connectToDb } from "@/utils/database";

export const POST = async (req) => {
    console.log("route called");


    try {
        const body = await req.json();
        await connectToDb();

        if (!body) {
            throw new Error("Invalid JSON data in the request body.");
        }

        const { owner, customer, product, shippingAddress, rate } = body;

        console.log(customer);
        var customer_mid;
        if (customer.charAt(0) == 'f') {
            console.log('finding user');
            customer_mid = await User.findOne({ passwordHash: customer }).exec();;
        }
        console.log(customer_mid);

        const newOrder = new Order({
            // creator: customer,
            owner,
            customer: customer_mid._id,
            product,
            status: 'OPEN',
            shippingAddress,
            rate
        });

        await newOrder.save();
        return new Response(JSON.stringify(newOrder), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Order..:" + error, { status: 500 })
    }
}