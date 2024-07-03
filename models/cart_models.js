import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
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
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    _id: false
});

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [cartItemSchema],
    totalQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

cartSchema.pre('save', function () {
    this.totalQuantity = this.items.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
});

const Cart = mongoose.model('Carts', cartSchema);

export default Cart
