import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    }
});

const User = mongoose.model("User", userSchema);

export default User;