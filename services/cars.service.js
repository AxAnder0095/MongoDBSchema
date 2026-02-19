import Car from "../models/cars.model.js";

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

export const createCars = async (req, res) => {
    const cars = req.body;

    if (!Array.isArray(cars) || cars.length === 0) {
        return res.status(400).json({ message: "An array of cars is required" });
    }

    try {
        const savedCars = await Car.insertMany(cars);
        res.status(201).json({ data: savedCars });
    } catch (err) {
        res.status(500).json({ message: "Failed to create cars" });
    }
};