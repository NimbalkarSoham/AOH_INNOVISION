import User from "@/models/users";
import { connectToDb } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDb();
        console.log('route called');

        const users = await User.find({});
        console.log(users);

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch USers", { status: 500 })
    }
}