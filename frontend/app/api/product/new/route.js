import Product from "@/models/product";
import User from "@/models/users";
import { connectToDb } from "@/utils/database";

export const POST = async (req) => {
    const { userId, name, description, price, image, location } = await req.json();
    var user = null;

    if (userId.charAt(0) == 'f') {
        user = User.findOne({ passwordHash: userId.substring(3) });
    }

    try {
        await connectToDb();
        const newProduct = new Product({
            creator: userId,
            name,
            description,
            price,
            image,
            location,
        })

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new product..", { status: 500 })
    }
}