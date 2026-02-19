import Car from "../models/cars.model.js";

export const getPurchases = async (req, res) => {
    try{
        const purchases = await Car.find({ isSold: true }).populate("owner", "name email");
        res.json({ purchases: purchases });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve purchases" });
    }
};

export const getAvailableCars = async (req, res) => {
    try {
        const availableCars = await Car.find({ isSold: false });
        res.json({ availableCars: availableCars });
    }catch (err) {
        res.status(500).json({ message: "Failed to retrieve available cars" });
    }
};