import mongoose from "mongoose";

console.log("DB value:", process.env.DB);
console.log("Attempting to connect to MongoDB...");

// mongoose.connect(process.env.DB, {
//     serverSelectionTimeoutMS: 10000
// })
//     .then(() => {
//         console.log("✅ Connected to MongoDB database");
//     })
//     .catch((err) => {
//         console.error("❌ Connection error:", err.message);
//     });

const connectDB = (url) => {
    return mongoose.connect(url).then(() => {
        console.log("Connected to the db");
    });
}

export default connectDB;
