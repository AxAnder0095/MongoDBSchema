import Car from "../models/cars.model.js";
import User from "../models/users.model.js";

export const purchaseCar = async (req, res) => {
    const { carId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) { // If the user doesn't exist, return a 404 error.
            return res.status(404).json({ message: "User not found" });
        };

        const car = await Car.findOneAndUpdate(
            { _id: carId, isSold: false }, // Find the car by ID and ensure it's not sold.
            { isSold: true, owner: user._id }, // Update the car to mark it as sold and set the owner.
            { new: true } // Return the updated car document.
        );

        if (!car) { // If the car doesn't exist, then it has been sold or doesn't exist, return a 404 error.
            return res.status(404).json({ message: "Car not found" });
        };

        await User.findByIdAndUpdate(
            userId,
            { $push: { ownedCars: car._id } } // Add the car ID to the user's ownedCars array.
        )

        res.status(200).json({ message: "Car purchased successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to purchase car" });
    };
}

export const purchaseCarDepricated = async (req, res) => {
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
};

export const sellCar = async (req, res) => {
    const { carId, userId } = req.body;

    try {
        // 1️ Atomically update the car ONLY if:
        // - it exists
        // - it is currently sold
        // - it belongs to this user
        const car = await Car.findOneAndUpdate(
            {
                _id: carId, // Find the car by ID
                isSold: true, // Ensure the car is currently sold
                owner: userId // Ensure the car belongs to this user
            },
            {
                isSold: false, // Mark the car as unsold
                owner: null // Remove the owner

            },
            { new: true } // Return the updated car document
        );

        if (!car) {
            return res.status(400).json({
                message: "Car not owned by this user or already unsold"
            });
        }

        // 2️⃣ Remove car from user's ownedCars array
        await User.findByIdAndUpdate(
            userId,
            { $pull: { ownedCars: carId } } // Remove the car ID from the user's ownedCars array
        );

        res.status(200).json({ message: "Car sold successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to sell car" });
    }
};