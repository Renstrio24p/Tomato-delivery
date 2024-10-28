import { Request, Response } from "express";
import { userModel } from "../../models/user.model.mts";
import { UserType } from "../users/types/User.ts";
import { Expression } from "mongoose";

export const removeFromCart = async (
    req: Request<UserType, {}, UserType & { cartItems: Record<string, number> }>,
    res: Response
): Promise<Expression> => {
    const { cartItems, id } = req.body; // Receive the cart items and user ID

    try {
        const userData = await userModel.findById(id);
        if (!userData) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        const cartData = userData.cartData || {}; // Initialize cartData if undefined

        Object.entries(cartItems).forEach(([itemId, quantity]) => {
            if (quantity <= 1) {
                delete cartData[itemId]; // Remove item if quantity is 0
            } else {
                cartData[itemId] = quantity; // Update or add item if quantity is not 0
            }

            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove item if quantity is 0
            }
        });


        // Save the updated userData back to the database
        await userModel.findByIdAndUpdate(id, { cartData }, { new: true });

        return res.status(200).json({ status: 200, message: "Items updated in cart successfully" });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to update items in cart",
            error: (error as Error).message
        });
    }
};
