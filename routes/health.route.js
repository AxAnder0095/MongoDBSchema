import express from "express";
import { healthCheck } from "../controllers/health.controller.js";
    
const router = express.Router();

// Health check endpoint to verify that the server is running and can respond to requests
router.get("/health", healthCheck);

export default router;