import express from "express";
import { sellerLogin, sellerLogout, sellerSignup } from "../controllers/sellerAuth_controller.js";

const sellerAuthRouter = express.Router()

sellerAuthRouter.route('/signup').post(sellerSignup)
sellerAuthRouter.route('/login').post(sellerLogin)
sellerAuthRouter.route('/logout').get(sellerLogout)

export default sellerAuthRouter