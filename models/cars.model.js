import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: { type: String, required: [true, "Make is required"] },
    model: { type: String, required: [true, "Model is required"] },
    year: { type: Number, required: [true, "Year is required"] },
    color: { type: String, required: [true, "Color is required"] },
});

const Car = mongoose.model("Car", carSchema);

export default Car;