import express from "express";
import { getUsers, getUserByEmail, getUserByID } from "../controllers/users.controller.js";
import { addUser, addUsers } from "../services/users.service.js";

const router = express.Router();

 // Controllers for reciving users
router.get("/users", getUsers);
router.get("/users/:id", getUserByID);
router.get("/users/email/:email", getUserByEmail);

// Services for adding users
router.post("/users", addUser);
router.post("/users/batch", addUsers);
export default router;