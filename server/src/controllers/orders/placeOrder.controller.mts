import { userModel } from "../../models/user.model.mts";
import { orderModel } from "../../models/order.model.mts";
import { Request, Response } from "express";
import { Expression } from "mongoose";
import Stripe from "stripe";
import { getEnvVariable } from "../../helpers/getEnv.mts";
import { Order } from "./types/Order.ts";

// Placing an order
type NewRequest = Request & {
    userId: string
}

export const placeOrder = async (req: Request<{}, {}, Order>, res: Response): Promise<Expression> => {
    const stripe = new Stripe(getEnvVariable('STRIPE_SECRET_KEY'));

    // Assuming userId is set by the auth middleware in req.userId
    const newReq = req as NewRequest;
    const userId = newReq.body.userId;
    const { items, amount, address } = req.body; // Make sure these fields exist in the request body

    try {
        // Create a new order using userId from the middleware
        const newOrder = new orderModel({
            userId: userId, // Use the userId from the request
            items: items,
            amount: (amount).toFixed(2),
            address: address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Clear the user's cart data

        // Create line items for Stripe checkout
        // Create line items for Stripe checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'php',
                product_data: {
                    name: item.name
                },
                // Ensure the price is rounded to avoid floating-point precision issues
                unit_amount: Math.round(item.price * 100 * 80), // Adjust as necessary
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: 'php',
                product_data: {
                    name: 'Delivery fee'
                },
                // Ensure the delivery fee is also rounded
                unit_amount: Math.round(amount * 100 * 20) // Adjust as necessary
            },
            quantity: 1
        });


        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${getEnvVariable('CLIENT_URL')}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url: `${getEnvVariable('CLIENT_URL')}/verify?success=false&order_id=${newOrder._id}`,
        });

        return res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to place order', error: (error as Error).message });
    }
};

