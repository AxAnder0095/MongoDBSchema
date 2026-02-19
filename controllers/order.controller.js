import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate("user", "name email").populate("car", "make model year price");
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    };
};

export const getOrdersByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId });
        if (orders.length === 0) {
            return res.status(404).json({ message: "Orders not found for user" });
        };
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders for user" });
    };
};