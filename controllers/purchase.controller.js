import Car from "../models/cars.model.js";

export const getAvailableCars = async (req, res) => {
    try {
        const availableCars = await Car.find({ owner: null });
        res.json({ availableCars: availableCars });
    }catch (err) {
        res.status(500).json({ message: "Failed to retrieve available cars" });
    }
};

export const getSoldCars = async (req, res) => {
    try {
        const soldCars = await Car.find({ owner: { $ne: null } }).populate("owner", "name email"); // $ne means "not equal". This query finds all cars where the owner field is not null, which means they are sold.
        res.json({ soldCars: soldCars });
    }catch (err) {
        res.status(500).json({ message: "Failed to retrieve sold cars" });
    }
};

export const getPurchasesByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const purchases = await Car.find({ owner: userId }).populate("owner", "name email");
        res.json({ purchases: purchases });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve purchases for user" });
    };
};