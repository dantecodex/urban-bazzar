import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is a required field"],
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User Email is a required field"],
        lowercase: true,
        validate: [validator.isEmail, "Please enter valid user email"]
    },
    password: {
        type: String,
        required: [true, "User password is a required field"],
        minlength: 6,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "User confirm password is a required field"],
        minlength: 6,
        validate: {
            validator: function (value) {
                return this.password === value
            },
            message: "Password and confirm Password do not match"
        }
    },
    address: {
        type: addressSchema
    },
    orderHistory: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Orders",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
    active: {
        type: Boolean,
        default: true
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date

}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined
    next()
})

userSchema.methods.comparePasswordFromDB = async (enteredPassword, passwordInDB) => {
    return await bcrypt.compare(enteredPassword, passwordInDB)
}

const User = mongoose.model("Users", userSchema)

export default User