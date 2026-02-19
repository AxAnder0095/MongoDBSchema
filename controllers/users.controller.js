import * as userService from "../services/users.service.js";

// If handleing a request that only deals with one field, 
// deconstruct the value of that field from req.body for more concise and readable code.

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ users: users });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
};

export const getUserByID = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userService.getUserByID(id);
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
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve user" });
    };
};

export const createUser = async (req, res) => {
    try{
        const savedUser = await userService.addUser(req.body);
        res.status(201).json({ message: "User added successfully", user: savedUser });
    }catch (err) {
        res.status(500).json({ message: "Failed to create user" });
    };
};

export const createUsersBatch = async (req, res) => {
    try {
        const savedUser = await userService.addUsers(req.body);
        res.status(201).json({ message: "Users added successfully", users: savedUser });
    }catch (err) {
        res.status(500).json({ message: "Failed to create users" });
    };
}
