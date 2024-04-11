import { connectToDb } from "@/utils/database";
import Product from "@/models/product";

export const GET = async (request) => {
    try {
        await connectToDb();

        const products = await Product.find({});

        return new Response(JSON.stringify(products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch products", { status: 500 })
    }
}

export const PUT=async(request)=>{
    const {id, rating}=await request.json();
    console.log(id);
    console.log(rating);
    try{
        connectToDb()
        const product=await Product.findById(id);
        product.rating=parseFloat(rating)+parseFloat(product.rating);
        await product.save();
        console.log(product);
        console.log(rating);
        return new Response(JSON.stringify(product), {status:200})
    }
    catch(error){
        console.log(error)
        return new Response("Internal Server Error", { status: 500 })
    }
}