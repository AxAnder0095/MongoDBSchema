import express from "express";
import carRoutes  from "./routes/cars.routes.js";
import userRoutes from "./routes/users.route.js";
import purchaseRoutes from "./routes/purchase.route.js";
import healthRoutes from "./routes/health.route.js";
import orderRoutes from "./routes/order.route.js";

const app = express();
app.use(express.json());

// Routes
app.use("/api", carRoutes);
app.use("/api", userRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", healthRoutes);
app.use("/api", orderRoutes);
export default app;