import { getEnvVariable } from "../../helpers/getEnv.mts";
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
    getEnvVariable('CLIENT_URL'),
    getEnvVariable('VERCEL_URL'),
    getEnvVariable('NETLIFY_URL'),
    getEnvVariable('SERVER_URL'),
    getEnvVariable('ADMIN_URL'),
];

export const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like same-origin requests)
        if (!origin) {
            return callback(null, true);
        }

        // Check if the request's origin matches any allowed origins
        const isAllowed = allowedOrigins.some((allowedOrigin: string | RegExp) => {
            if (typeof allowedOrigin === 'string') {
                return origin === allowedOrigin;
            } else if (allowedOrigin instanceof RegExp) {
                return allowedOrigin.test(origin);
            }
            return false;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
