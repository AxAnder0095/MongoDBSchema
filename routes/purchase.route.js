import express from "express";
import * as purchaseContollers from "../controllers/purchase.controller.js";
import { purchaseCar, sellCar} from "../services/purchase.service.js";

const router = express.Router();
// Controller routes for purchases
router.get("/available", purchaseContollers.getAvailableCars);
router.get("/purchases", purchaseContollers.getPurchases);
router.get("/sold", purchaseContollers.getSoldCars);
router.get("/purchases/:userId", purchaseContollers.getPurchasesByUser);

// Service routes for purchasing cars
router.post("/purchases", purchaseCar);
router.post("/sell", sellCar);
export default router;