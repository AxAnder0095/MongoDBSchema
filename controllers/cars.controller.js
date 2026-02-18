import Car from "../models/cars.model.js";

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find(); // No need to use db.collection("cars") since we're using Mongoose
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    }
};

export const getCarByModel = async (req, res) => {
    const { model } = req.params;

    try {
        const car = await Car.findOne({ model: model });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        };
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve car" });
    };
};

export const testConnection = async (req, res) => { // This is just a test endpoint to verify that the server is running and can respond to requests
    res.json({ message: "Hello from the server!" });
}