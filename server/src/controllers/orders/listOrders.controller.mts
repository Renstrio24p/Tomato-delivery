import { Request, Response } from "express";
import { Expression } from "mongoose";
import { orderModel } from "../../models/order.model.mts";

export const listOrders = async (_req: Request, res: Response): Promise<Expression> => {

    try {
        const orders = await orderModel.find({})
        return res.json({
            status: 200,
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to get orders',
            error: (error as Error).message
        })
    }
}