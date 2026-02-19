import mongoose from "mongoose";

export const healthCheck = async (req, res) => {
    const dbState = mongoose.connection.readyState;
    
    if (dbState === 1) {
        res.status(200).json({
            status: "UP",
            database: "Connected",
            timeStamp: new Date().toISOString()
        });
    } else {
        res.status(503).json({
            status: "DOWN",
            database: "Unavailable",
            readyState: dbState,
            timeStamp: new Date().toISOString()
        });
    };
};