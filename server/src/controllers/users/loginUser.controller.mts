import { userModel } from "../../models/user.model.mts";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Request, Response } from "express";
import { Expression } from "mongoose";
import { UserType } from "./types/User.ts";
import { createToken } from "../../helpers/createToken.mts";

export const loginUser = async (req: Request<{}, {}, UserType>, res: Response): Promise<Expression> => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid email; please provide a valid email address'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid credentials'
            });
        }

        // Create a token for the user
        const token = createToken(user._id);

        // Set HTTP-only cookie with user data
        const userData = {
            _id: user._id,
            email: user.email,
            image: user.image, // Include only the necessary fields
            // Add any other user info you want to store, but avoid sensitive data
        };

        res.cookie('userData', JSON.stringify(userData), {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (1 day in this example)
        });

        return res.status(200).json({
            status: 200,
            message: 'User logged in successfully',
            token: token // Send only the token in the response
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
}
