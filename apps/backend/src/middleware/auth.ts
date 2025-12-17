import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization as unknown as string;

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (payload) {
            //@ts-ignore
            req.id = payload.id
            next();
        }

    } catch (error) {
        return res.status(403).json({
            message: "Invalid credentials", error
        })

    }

}

