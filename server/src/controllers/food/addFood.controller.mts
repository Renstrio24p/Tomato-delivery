import { food } from '../../models/food.model.mts';
import { Request, Response } from 'express';
import { FoodType } from './types/Food.ts';
import { Expression } from 'mongoose';

export const addFood = async (req: Request<{}, {}, FoodType>, res: Response): Promise<Expression> => {
    // If expecting a single image, get the first filename from the array
    const image_filename = (req.files as Express.Multer.File[])[0]?.filename || '';

    const { name, description, price, category } = req.body;

    const foodModel = new food({
        name,
        description,
        price,
        image: image_filename,
        category
    });

    try {
        await foodModel.save();
        return res.status(200).json({
            status: 200,
            message: 'Food added successfully and has been converted to .webp format'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to add food',
            error: (error as Error).message
        });
    }
};
