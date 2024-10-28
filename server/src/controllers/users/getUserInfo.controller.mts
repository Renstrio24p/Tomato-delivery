import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model.mts";
import { Request, Response } from "express";
import { Expression } from "mongoose";

export const getUserInfo = async (req: Request, res: Response): Promise<Expression> => {
    try {
        // Retrieve the token from the Authorization header
        const { token } = req.body

        if (!token) {
            return res.status(401).json({ success: false, message: "Access token is missing" });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (!decoded) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }

        // Fetch the user from the database using the decoded user ID
        const user = await userModel.findById(decoded.userId).select("-password"); // Exclude password from results

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Respond with the user data
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
