import { Request, Response } from 'express';
import { Expression } from 'mongoose';
import { food } from '../../models/food.model.mts';

export const listFood = async (_req: Request, res: Response): Promise<Expression> => {
    try {
        const foods = await food.find({});
        res.status(200).json({
            status: 200,
            data: foods,
            statusText: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Failed to get foods',
            error: (error as Error).message
        })
    }
}