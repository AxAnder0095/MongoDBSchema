import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

startServer();