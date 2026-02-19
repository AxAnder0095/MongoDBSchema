import express from "express";
import carRoutes  from "./routes/cars.routes.js";
import userRoutes from "./routes/users.route.js";
import purchaseRoutes from "./routes/purchase.route.js";

const app = express();
app.use(express.json());

// Routes
app.use("/api", carRoutes);
app.use("/api", userRoutes);
app.use("/api", purchaseRoutes);

export default app;