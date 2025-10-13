import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


    export function authenticate (req: Request, res: Response, next: NextFunction): any {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            (req as any).user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }


