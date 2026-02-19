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
    }, 
    ownedCars: { // Only use this field when a user is buying a car. 
        type: mongoose.Schema.Types.ObjectId, // If user owns a car, enter the ID of the car. If user doesn't own a car, this field will be null.
        ref: "Car",
        default: null
    }
});

const User = mongoose.model("User", userSchema);

export default User;