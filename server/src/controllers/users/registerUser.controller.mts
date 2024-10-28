import { userModel } from "../../models/user.model.mts";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Request, Response } from "express";
import { Expression } from "mongoose";
import { UserType } from "./types/User.ts";
import { createToken } from "../../helpers/createToken.mts";

export const registerUser = async (req: Request<{}, {}, UserType>, res: Response): Promise<Expression> => {
    const { name, email, password } = req.body;
    const imageFilename = req.file?.filename || '';

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'All fields are required'
            });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({
                status: 409,
                message: 'User already exists'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid email; please provide a valid email address'
            });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                status: 400,
                message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            image: imageFilename // Now saves the WebP image filename
        });

        await newUser.save();
        const token = createToken(newUser._id);

        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to create user',
            error: (error as Error).message
        });
    }
};
