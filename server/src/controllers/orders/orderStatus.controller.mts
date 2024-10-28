import { Request, Response } from "express"
import { orderModel } from "../../models/order.model.mts"
import { Expression } from "mongoose"

export const updateStatus = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status: status })
        return res.json({ status: 200, success: true, message: 'Status updated successfully' })
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: 'Failed to update status', error: (error as Error).message })
    }
}