import User from "../models/users.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users: users });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
};

export const getUserByID = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    };
};

export const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    };
};

