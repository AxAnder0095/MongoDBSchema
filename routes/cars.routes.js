import express from "express";
import { getAllCars, testConnection, createCar } from "../controllers/cars.controller.js";

const router = express.Router();

router.get("/cars", getAllCars);
router.post("/cars", createCar);
router.get("/test", testConnection);

export default router;