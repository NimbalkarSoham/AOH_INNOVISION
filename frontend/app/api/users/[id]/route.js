import User from "@/models/users";
import { connectToDb } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        const user = await User.findById(params.id)
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

//For user verification

export const PATCH = async (request, { params }) => {
    try {
        await connectToDb()

        const user = await User.findById(params.id)
        if (!user) return new Response("User Not Found", { status: 404 });

        user.isVerified = "verified";
        await user.save();

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Could not update User", { status: 500 });
    }
}

// For KYC update
export const PUT = async (request, { params }) => {
    try {
        await connectToDb()

        const user = await User.findById(params.id)
        if (!user) return new Response("User Not Found", { status: 404 });

        const { contact, address, aadharNo, aadharImage } = await request.json();
        user.phone = contact;
        user.street = address;
        user.AadharCard = aadharImage;
        user.AadharNo = aadharNo;
        user.isVerified = "under-verification";
        await user.save();

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Could not update User", { status: 500 });
    }
}