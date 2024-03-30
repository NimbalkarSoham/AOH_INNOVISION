import Order from "@/models/order";
import User from "@/models/users";
import { connectToDb } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        var customer_mid;
        var orders;
        if (params.id.charAt(0) == 'f') {
            console.log(`finding user: ${params.id}`);
            customer_mid = await User.findOne({ passwordHash: params.id }).exec();
            console.log(customer_mid);
            orders = await Order.find({ customer: customer_mid._id }).populate('owner').populate('product');
        } else {
            orders = await Order.find({ customer: params.id }).populate('owner').populate('product');
        }


        //console.log('Found products:', products);
        return new Response(JSON.stringify(orders), {
            status: 200
        })
    }
    catch (error) {
        console.error('Error:', error);
        return new Response("Failed to fetch all orders", { status: 500 })
    }
}