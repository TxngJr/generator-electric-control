import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/UserModel';
import jsonwebtoken from 'jsonwebtoken';
import { UserInterFace } from '../interfaces/UserUserInterFace';

interface CustomRequest extends Request {
    user?: any;
}

export async function checkToken(req: CustomRequest, res: Response, next: NextFunction) {
    const { JSONWEBTOKEN_SECRET }: any = process.env;
    try {
        const token: any = req.header('Authorization')?.replace('Bearer ', "");
        const decoded = jsonwebtoken.verify(token, JSONWEBTOKEN_SECRET);
        const user = await UserModel.findOne({ _id: decoded, token: token });
        if(!user){
            return res.status(401).json('Please authenticate.');
        };
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json('An error occurred while auth.');
    }
}