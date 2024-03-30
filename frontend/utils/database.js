import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('Mongodb is already connected');
        return;
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "agrifarm",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDb connected');
    } catch (error) {
        console.log(error);
    }
}