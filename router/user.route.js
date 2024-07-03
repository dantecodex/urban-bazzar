import express from "express";
import { addAddress, payment } from "../controllers/user_controller.js";

const userRouter = express.Router()

userRouter.route('/address').post(addAddress)
userRouter.route('/payment').post(payment)

export default userRouter