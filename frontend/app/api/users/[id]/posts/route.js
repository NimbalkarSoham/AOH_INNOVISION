import Product from '@/models/product'
import { connectToDb } from '@/utils/database'


export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        const products = await Product.find({ creator: params.id }).populate('creator');
        //console.log('Found products:', products);
        return new Response(JSON.stringify(products), {
            status: 200
        })
    }
    catch (error) {
        console.error('Error:', error);
        return new Response("Failed to fetch all products", { status: 500 })
    }
}