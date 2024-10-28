import { Request, Response } from "express";
import { orderModel } from "../../models/order.model.mts";
import { Expression } from "mongoose";

type NewRequest = Request & {
    userId: string
}

export const userOrder = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const newReq = req as NewRequest;
        const userId = newReq.body.userId;

        const orders = await orderModel.find({ userId });
        console.log("Orders found:", orders);

        return res.json({
            status: 200,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to get orders',
            error: (error as Error).message
        });
    }
};
