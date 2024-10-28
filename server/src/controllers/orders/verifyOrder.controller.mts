import { Request, Response } from "express";
import { Expression } from "mongoose";
import { VerifyOrder } from "./types/Order.ts";
import { orderModel } from "../../models/order.model.mts";

export const verifyOrder = async (req: Request<{}, {}, VerifyOrder>, res: Response): Promise<Expression> => {
    const { orderId, success } = req.body

    try {
        if (success === true) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Order verified successfully! Paid',
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            // not paid
            return res.status(200).json({
                status: 401,
                success: false,
                message: 'Order verified successfully! Not paid',
            })
        }
    } catch (error) {

        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Failed to verify order Cancelled',
            error: (error as Error).message
        })

    }
}