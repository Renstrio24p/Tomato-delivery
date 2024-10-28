import { Request, Response } from "express";
import { userModel } from "../../models/user.model.mts";
import { UserType } from "../users/types/User.ts";
import { Expression } from "mongoose";

export const addToCart = async (
    req: Request<UserType, {}, UserType & { cartItems: Record<string, number> }>,
    res: Response
): Promise<Expression> => {
    const { cartItems, id } = req.body; // Receive the whole cartItems object

    try {
        const userData = await userModel.findById(id); // Assuming user ID is stored in req.user
        if (!userData) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        const cartData = userData.cartData || {}; // Initialize if undefined

        // Update cartData directly with the new cartItems
        Object.entries(cartItems).forEach(([itemId, quantity]) => {
            // Directly assign the quantity from cartItems to cartData
            cartData[itemId] = quantity; // This will overwrite existing quantities
        });

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(id, { cartData }, { new: true });

        return res.status(200).json({ status: 200, message: "Food added to cart successfully" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Failed to add food to cart", error: (error as Error).message });
    }
};
