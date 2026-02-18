import express from "express";
import carRoutes  from "./routes/cars.routes.js";


const app = express();
app.use(express.json());

// Routes
app.use("/api", carRoutes);

export default app;