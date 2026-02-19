import Car from "../models/cars.model.js";

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find(); // No need to use db.collection("cars") since we're using Mongoose
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    }
};

export const getCarsByModel = async (req, res) => {
    const { model } = req.params;

    try {
        const cars = await Car.find({ model: model });
        if (cars.length === 0) {
            return res.status(404).json({ message: "Cars not found" });
        };
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    };
};

export const getCarsByMake = async (req, res) => {
    const { make } = req.params;

    try {
        const cars = await Car.find({ make: make });
        if (cars.length === 0) {
            return res.status(404).json({ message: "Cars not found" });
        };
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    };
};

export const getCarByOwner = async (req, res) => {
    const { owner } = req.params;

    try {
        const cars = await Car.find({ owner: owner });
        if (cars.length === 0) {
            return res.status(404).json({ message: "Cars not found" });
        };
        res.status(200).json({ cars: cars });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    };
};

export const getCarsByYear = async (req, res) => {
    const { year } = req.params;

    try {
        const cars = await Car.find({ year: year });
        if (cars.length === 0) {
            return res.status(404).json({ message: "Cars not found" });
        };
        res.status(200).json({ cars: cars });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    };
};

export const testConnection = async (req, res) => { // This is just a test endpoint to verify that the server is running and can respond to requests
    res.json({ message: "Hello from the server!" });
}