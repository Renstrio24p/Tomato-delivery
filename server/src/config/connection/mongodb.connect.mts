import mongoose, { Expression } from "mongoose";
import { Router, Request, Response } from "express";
import { MongoConfig, Service } from "../types/config.type.mts";

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<Expression> => {
    return res.send('Hello Node TS API');
})

export const connect = async (mongo: MongoConfig, listener: Service): Promise<Service> => {
    return mongoose.connect(mongo.online)
        .then(() => {
            console.log('Connected to MongoDB Online Atlas!...');
            return listener;
        })
        .catch((error: Error) => {
            console.log(`Failed to connect to MongoDB Online Atlas: [${error.message}]`);
            console.log("Attempting to connect to MongoDB Offline...");

            return mongoose.connect(mongo.offline)
                .then(() => {
                    console.log('Connected to MongoDB Offline!...');
                    return listener;
                })
                .catch((error: Error) => {
                    console.log(`Failed to connect to MongoDB Offline: [${error.message}]`);
                    throw error;
                });
        });
};