import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config, mongo } from './config/mongodb.config.mts';
import { connect } from './config/connection/mongodb.connect.mts';
import { Expression } from 'mongoose';
import { corsOptions } from './config/auth/cors.auth.ts';
import { foodRouter } from './routes/food.routes.ts';
import { userRouter } from './routes/user.routes.mts';
import { cartRouter } from './routes/cart.routes.ts';
import { orderRouter } from './routes/order.routes.ts';

// Create an Express application instance
export const app = express();

// Define a basic GET route for the root URL
app.get('/', (_req: Request, res: Response): Expression => {
    return res.send('Hello Node TS API');
});

// Add Helmet Security Headers
app.use(helmet());

// Use CORS with specific options defined in corsOptions to restrict/allow certain domains
app.use(cors(corsOptions));

// Parse incoming JSON requests, this is middleware to handle JSON data in requests
app.use(express.json());

// Mount the router (API)
app.use('/api/food', foodRouter);

// Serve images with static files and set security headers
app.use(
    '/images',
    express.static('src/uploads', {
        setHeaders: (res) => {
            // Set Cross-Origin headers for resource policies
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'cross-origin');
            res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        },
    })
);

app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Start the server and listen on the port specified in the config
const listener = app.listen(config.port, (): void => {
    console.log(`Server started on port ${config.port}`);
});

// Establish a connection to MongoDB (either online or offline) using the connect function
connect(mongo, listener);
