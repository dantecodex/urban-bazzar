import mongoose from "mongoose";
import "dotenv/config"

import app from "./app.js";

mongoose.connect(process.env.CONN_STR)
    .then(conn => {
        console.log('DB connection successfull');
    })
    .catch(err => {
        console.log('Failed to connect with MongoDB', err);
        process.exit(1)
    })

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has been Started...');
})

