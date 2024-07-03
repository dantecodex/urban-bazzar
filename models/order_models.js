import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { _id: false });

const addressSchema = new mongoose.Schema({
    line: {
        type: String,
        required: [true, "Address Line is a required field"]
    },
    city: {
        type: String,
        required: [true, "City is a required field"]
    },
    state: {
        type: String,
        required: [true, "State is a required field"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is a required field"]
    },
    pincode: {
        type: String,
        required: [true, "Pincode is a required field"]
    },
    country: {
        type: String,
        required: [true, "Country is a required field"]
    }
}, { _id: false })

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [itemSchema],
    totalQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userAddress: {
        type: addressSchema
    }
}, { timestamps: true });

const Order = mongoose.model('Orders', orderSchema);

export default Order
