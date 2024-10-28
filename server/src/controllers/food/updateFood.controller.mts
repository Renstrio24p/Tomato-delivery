import { Request, Response } from "express";
import { Expression } from "mongoose";
import { food } from "../../models/food.model.mts";
import { FoodType } from './types/Food.ts';

export const updateFood = async (req: Request<{}, {}, FoodType>, res: Response): Promise<Expression> => {
    try {
        const { id, name, description, price, category } = req.body;
        const image_filename = (req.files as Express.Multer.File[])[0]?.filename || '';

        // Update the food item by ID
        const updatedFood = await food.findByIdAndUpdate(
            id,
            { name, description, price, category, image: image_filename },
            { new: true } // returns the updated document
        );

        if (!updatedFood) {
            return res.status(404).json({
                status: 404,
                message: 'Food item not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Food updated successfully',
            data: updatedFood
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to update food',
            error: (error as Error).message
        });
    }
};
