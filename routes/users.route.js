import express from "express";
import * as userControllers from "../controllers/users.controller.js";


const router = express.Router();

 // Controllers for receiving users
router.get("/users", userControllers.getUsers);
router.get("/users/:id", userControllers.getUserByID);
router.get("/users/email/:email", userControllers.getUserByEmail);

// Services for adding users
router.post("/users", userControllers.createUser);
router.post("/users/batch", userControllers.createUsersBatch);
export default router;