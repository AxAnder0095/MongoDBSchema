import Car from "../models/cars.model.js";

export const addCar = async (carData) => {
    if (!carData.make || !carData.model || !carData.year || !carData.color) {
        throw new Error("All fields are required");
    };

    const newCar = new Car(carData);

    try {
        const savedCar = await newCar.save();
        return savedCar;
    } catch (err) {
        throw new Error("Failed to create car");
    };
};

export const addCars = async (carsArray) => {
    if (!Array.isArray(carsArray) || carsArray.length === 0) {
        throw new Error("An array of cars is required");
    };

    try {
        const savedCars = await Car.insertMany(carsArray);
        return savedCars;
    } catch (err) {
        throw new Error("Failed to create cars");
    };
};

export const getAllCars = () => Car.find();
export const getCarsByModel = (model) => Car.find({ model: model });
export const getCarsByMake = (make) => Car.find({ make: make });
export const getCarsByYear = (year) => Car.find({ year: year });
export const getCarsByOwner = (owner) => Car.find({ owner: owner });