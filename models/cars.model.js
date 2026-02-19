import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, "Make is required"]
    },
    model: {
        type: String,
        required: [true, "Model is required"]
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    color: {
        type: String,
        required: [true, "Color is required"]
    },
    isSold: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // If car is sold, enter the ID of the user who bought it. If not sold, this field will be null.
        ref: "User",
        default: null
    }
});

const Car = mongoose.model("Car", carSchema);

export default Car;