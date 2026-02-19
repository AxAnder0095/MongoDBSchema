import mongoose from "mongoose";
import User from "../models/users.model.js";
import Car from "../models/cars.model.js";
import Order from "../models/order.model.js";

export const purchaseCar = async (req, res) => {
    const { carId, userId, price } = req.body; // Add price if needed

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {

            const user = await User.findById(userId).session(session);
            if (!user) {
                throw new Error("USER_NOT_FOUND");
            }

            const updatedCar = await Car.findOneAndUpdate(
                { _id: carId, isSold: false },
                { isSold: true, owner: user._id },
                { returnDocument: "after", session }
            );

            if (!updatedCar) {
                throw new Error("CAR_ALREADY_SOLD");
            }

            await Order.create(
                [
                    {
                        user: user._id,
                        car: updatedCar._id,
                        price: price || updatedCar.price // Use provided price or fallback to car's price
                    }
                ],
                { session }
            );
        });

        res.status(200).json({ message: "Car purchased successfully" });

    } catch (err) {
        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "User not found" });
        }

        if (err.message === "CAR_ALREADY_SOLD") {
            return res.status(409).json({ message: "Car is already sold" });
        }

        res.status(500).json({ message: "Failed to purchase car" });
    } finally {
        session.endSession();
    }
};

import mongoose from "mongoose";
import Car from "../models/car.model.js";
import Order from "../models/order.model.js";

export const sellCar = async (req, res) => {
    const { carId, userId } = req.body;

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            // 1️⃣ Ensure the car exists and belongs to the user
            const car = await Car.findOne({ _id: carId, owner: userId }).session(session);
            if (!car) {
                throw new Error("CAR_NOT_OWNED");
            }

            // 2️⃣ Update the car to mark it as unsold
            car.isSold = false;
            car.owner = null;
            await car.save({ session });

            // 3️⃣ Optionally update the order to mark it as returned
            // You could either delete the order or add a status field
            await Order.findOneAndUpdate(
                { car: carId, user: userId },
                { $set: { status: "returned", returnedAt: new Date() } },
                { returnDocument: "after", session }
            );
        });

        res.status(200).json({ message: "Car sold/returned successfully" });
    } catch (err) {
        if (err.message === "CAR_NOT_OWNED") return res.status(404).json({ message: "Car not found or not owned by user" });
        console.error(err);
        res.status(500).json({ message: "Failed to sell car" });
    } finally {
        session.endSession();
    }
};

