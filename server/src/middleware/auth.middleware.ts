import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getEnvVariable } from "../helpers/getEnv.mts";
import { Expression } from "mongoose";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Expression> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, please log in first",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, getEnvVariable("JWT_SECRET")) as jwt.JwtPayload;
        req.body.userId = decoded.id; // Store user ID in the request body
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({
            success: false,
            message: "Token verification failed",
        });
    }
};
