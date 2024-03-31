import { Schema, model, models } from "mongoose";
import User from "./users";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    ownershipDoc: {
        type: String,  
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'not-verified'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    rating: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        default: "",
    },
    contact: {
        type: String,
        default: ""
    },
    model:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:""
    }
});

const Product = models.Product || model("Product",productSchema);

export default Product;