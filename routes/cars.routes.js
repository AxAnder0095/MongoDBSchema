import express from "express";
import {testConnection, getAllCars, getCarsByModel, getCarsByMake, getCarsByYear } from "../controllers/cars.controller.js";
import { createCar, createCars } from "../services/cars.service.js";
    
const router = express.Router();

// Test endpoint to verify that the server is running and can respond to requests
router.get("/test", testConnection);

// Controllers for retrieving cars
router.get("/cars", getAllCars);
router.get("/cars/model/:model", getCarsByModel);
router.get("/cars/make/:make", getCarsByMake);
router.get("/cars/year/:year", getCarsByYear);

// Services for creating, updating, and deleting cars
router.post("/cars", createCar);
router.post("/cars/bulk", createCars);

export default router;