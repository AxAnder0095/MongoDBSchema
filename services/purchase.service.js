import Car from "../models/cars.model.js";
import User from "../models/users.model.js";

export const purchaseCar = async (req, res) => {
    const { carId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) { // If the user doesn't exist, return a 404 error.
            return res.status(404).json({ message: "User not found" });
        };

        const car = await Car.findById(carId);
        if (!car) { // If the car doesn't exist, return a 404 error.
            return res.status(404).json({ message: "Car not found" });
        };

        if (car.isSold) { // If the car is already sold, return a 400 error.
            return res.status(400).json({ message: "Car is already sold" });
        };

        car.isSold = true;
        car.owner = user._id;
        await car.save();

        user.ownedCars = car._id;
        await user.save();

        res.status(200).json({ message: "Car purchased successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to purchase car" });
    };
}

export const sellCar = async (req, res) => {
    const { carId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) { // If the user doesn't exist, return a 404 error.
            return res.status(404).json({ message: "User not found" });
        };

        const car = await Car.findById(carId);
        if (!car) { // If the car doesn't exist, return a 404 error.
            return res.status(404).json({ message: "Car not found" });
        };

        if (car.isSold) { // If the car is already sold, return a 400 error.
            return res.status(400).json({ message: "Car is already sold" });
        };

        car.isSold = false;
        car.owner = null;
        await car.save();

        user.ownedCars = null;
        await user.save();

        res.status(200).json({ message: "Car sold successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to sell car" });
    };
}