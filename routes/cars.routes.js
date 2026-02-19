import express from "express";
import * as carControllers from "../controllers/cars.controller.js";

    
const router = express.Router();

// Test endpoint to verify that the server is running and can respond to requests
router.get("/test", carControllers.testConnection);

// Controllers for retrieving cars
router.get("/cars", carControllers.getAllCars);
router.get("/cars/model/:model", carControllers.getCarsByModel);
router.get("/cars/make/:make", carControllers.getCarsByMake);
router.get("/cars/year/:year", carControllers.getCarsByYear);

// Services for creating, updating, and deleting cars
router.post("/cars", carControllers.createCar);
router.post("/cars/bulk", carControllers.createCars);

export default router;