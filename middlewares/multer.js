import multer from "multer";
import path from "path";

import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/temp"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid product file type, only images are allowed!'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 2000000 }, //1 mb
    fileFilter
})

export default upload