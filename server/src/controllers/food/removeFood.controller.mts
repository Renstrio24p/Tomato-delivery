import { Request, Response } from 'express';
import { Expression } from 'mongoose';
import { food } from '../../models/food.model.mts';
import { FoodType } from './types/Food.ts';
import fs from 'fs';

export const removeFood = async (req: Request<{}, {}, FoodType>, res: Response): Promise<Expression> => {

    try {
        const foodModel = await food.findByIdAndDelete(req.body.id);
        fs.unlinkSync(`./uploads/${foodModel?.image}`);

        return res.status(200).json({ status: 200, message: "Food Image removed successfully" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Failed to delete food Image", error: (error as Error).message })
    }
}