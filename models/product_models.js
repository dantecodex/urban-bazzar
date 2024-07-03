import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is a required field"],
        minlength: 3
    },
    description: {
        type: String,
        required: [true, "Product description is a required field"],
        minlength: 3
    },
    price: {
        type: Number,
        required: [true, "Product price is a required field"]
    },
    category: {
        type: String,
        required: [true, "Product category is a required field"],
    },
    stockQuantity: {
        type: Number,
        required: [true, "Product stock quantity is a required field"],
    },
    productImage: {
        type: String,
        required: [true, "Product Image is required"]
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sellers"
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users"
    },
    reviews: [String],
    ratings: [Number],
    avgRating: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Product = mongoose.model("Products", productSchema)

export default Product