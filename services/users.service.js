import User from "../models/users.model.js";

// If adding a object with only one field, use deconstructing to get the value of 
// that field instead of using req.body.fieldName, which is more concise and 
// easier to read. For example, if the request body contains 
// { "username": "john_doe" }, you can use const { username } = req.body; instead 
// of const username = req.body.username; This way, you can directly access the 
// username variable without having to reference req.body every time.
// Same goes for fetching a single user by ID or username.


// Add a new user to the database.
export const addUser = async (req, res) => {
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

export const addUsers = async (req, res) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "An array of users is required" });
    };

    try {
        const savedUsers = await User.insertMany(users);
        res.status(201).json({ message: "Users added successfully", users: savedUsers });
    }catch (err) {
        res.status(500).json({ message: "Failed to add users", error: err.message });
    };
};