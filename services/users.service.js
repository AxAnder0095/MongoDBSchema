import User from "../models/users.model.js";

// NOTE: Service layer should not handle HTTP requests or responses directly. 
// Instead, it should focus on business logic and data manipulation.

export const addUser = async (userData) => {
    if (!userData.name || !userData.email) {
        throw new Error("Name and email are required");
    };

    const newUser = new User(userData); // Create a new instance of the User model with the provided data
    try {
        const savedUser = await newUser.save(); // Save the new user to the database and return the saved user object
        return savedUser;
    } catch (err) {
        throw new Error("Failed to add user");
    };
};

export const addUsers = async (usersArray) => {
    if (!Array.isArray(usersArray) || usersArray.length === 0) {
        throw new Error("An array of users is required");
    };

    try {
        const savedUsers = await User.insertMany(usersArray);
        return savedUsers;
    } catch (err) {
        throw new Error("Failed to add users");
    };
};

export const getAllUsers = () => User.find();
export const getUserByID = (id) => User.findById(id);
export const getUserByEmail = (email) => User.findOne({ email: email });




// The following functions are depricated because they directly handle HTTP requests and responses, 
// which should be the responsibility of the controller layer, not the service layer.

export const addUserDepricated = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.email) {
        return res.status(400).json({ message: "Name and email are required" });
    };

    const newUser = new User(user); // Create a new instance of the User model with the provided data
    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User added successfully", user: savedUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to add user" });
    };
};

export const addUsersDepricated = async (req, res) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "An array of users is required" });
    };

    try {
        const savedUsers = await User.insertMany(users);
        res.status(201).json({ message: "Users added successfully", users: savedUsers });
    } catch (err) {
        res.status(500).json({ message: "Failed to add users", error: err.message });
    };
};