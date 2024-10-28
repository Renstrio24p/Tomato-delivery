import { Request, Response } from "express";
import { Expression } from "mongoose";
import { userModel } from "../../models/user.model.mts"

type NewRequest = Request & {
    userId: string
}

export const getCart = async (req: Request, res: Response): Promise<Expression> => {

    try {

        const newReq = req as unknown as NewRequest;
        const id = newReq.body.userId;

        let userData = await userModel.findById(id);
        console.log("User found:", userData);
        // Retrieve cart data from user data
        const cartData = userData.cartData;

        // Check if cartData is null or empty
        if (!cartData || cartData.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Cart is empty",
                cartData: [],
            });
        }

        return res.status(200).json({ status: 200, cartData: cartData! });

    } catch (error) {

        return res.status(500).json({ status: 500, message: "Failed to get cart", error: (error as Error).message });

    }

}