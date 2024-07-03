import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import customError from "./customError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new customError("There is an invalid path to the product image file in the local directory for uploading to cloudinary", 400)
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilePath)
        return cloudinaryResponse
    } catch (error) {
        fs.unlinkSync(localFilePath)

        if (error instanceof customError) {
            throw error;  // Re-throw custom errors to be handled upstream
        } else {
            throw new customError("Failed to upload image to Cloudinary", 500);
        }
    }
}

export default uploadOnCloudinary