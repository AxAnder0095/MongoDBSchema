import express from "express";
import { getPurchases, getAvailableCars, getSoldCars, getPurchasesByUser } from "../controllers/purchase.controller.js";
import { purchaseCar, sellCar } from "../services/purchase.service.js";

const router = express.Router();

// Controller routes for purchases
router.get("/available", getAvailableCars);
router.get("/purchases", getPurchases);
router.get("/sold", getSoldCars);
router.get("/purchases/:userId", getPurchasesByUser);

// Service routes for purchasing and selling cars
router.post("/purchases", purchaseCar);
router.post("/sell", sellCar);

export default router;