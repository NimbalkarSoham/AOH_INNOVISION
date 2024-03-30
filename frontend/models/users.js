import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    passwordHash: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    isVerified: {
        type: String,
        default: 'not-verified',
    },
    street: {
        type: String,
        default: ''
    },
    AadharCard: {
        type: String,
        default: ''
    },
    AadharNo :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }

});

const User = models.User || model("User",userSchema);

export default User;