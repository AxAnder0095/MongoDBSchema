import Car from "../models/cars.model.js";
// import mongoose from "mongoose";

// Create a new car

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cars" });
    }
};

export const createCar = async (req, res) => {
    const car = req.body;

    if (!car.make || !car.model || !car.year || !car.color) {
        return res.status(400).json({ message: "All fields are required" });
    };

    const newCar = new Car(car);

    try {
        const savedCar = await newCar.save();
        res.status(201).json({ data: savedCar });
    } catch (err) {
        res.status(500).json({ message: "Failed to create car" });
    };
};

export const testConnection = async (req, res) => {
    res.json({ message: "Hello from the server!" });
}