import express from "express";
import { getPurchases, getAvailableCars } from "../controllers/purchase.controller.js";
import { purchaseCar } from "../services/purchase.service.js";

const router = express.Router();

router.get("/available", getAvailableCars);
router.get("/purchases", getPurchases);
router.post("/purchases", purchaseCar);

export default router;