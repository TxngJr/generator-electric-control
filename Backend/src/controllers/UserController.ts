import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { UserInterFace } from '../interfaces/UserUserInterFace';
import nodemailer from 'nodemailer';

interface CustomRequest extends Request {
    user?: any;
}

export async function registerUser(req: Request, res: Response) {
    try {
        const { username, email, password }: { username?: string, email?: string, password?: string } = req.body;
        if (!(username && email && password)) {
            return res.status(406).json('Please provide a vaild username, email and password.');
        }
        const userExists = await UserModel.findOne({ username: username }, { email: email });
        if (userExists) {
            return res.status(404).json('That username or email is already registered. Please choose a different username or email.');
        }
        const hashPassword = await bcryptjs.hashSync(password, 10);
        const userSave: UserInterFace | null = await UserModel.create({ username: username, email: email, hashPassword: hashPassword });
        if (!userSave) {
            return res.status(507).json('An error occurred while register the username.');
        }
        return res.status(201).json('Username register successfully.');
    } catch (error) {
        return res.status(507).json('An error occurred while register the username.');
    }
}
export async function loginUser(req: Request, res: Response) {
    const { JSONWEBTOKEN_SECRET }: any = process.env;
    try {
        const { username, password }: { username: string, password: string } = req.body;
        if (!(username && password)) {
            return res.status(406).json('Please provide a vaild username and password.');
        }
        let user: UserInterFace | null = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json('Username or password wrong.');
        }
        const checkPassword = await bcryptjs.compareSync(password, user.hashPassword);
        if (!checkPassword) {
            return res.status(404).json('Username or password wrong.');
        }
        if (!user.token) {
            const token = jsonwebtoken.sign({ _id: user._id }, JSONWEBTOKEN_SECRET);
            user.token = token;
            await user.save();
            return res.status(200).json({ token: user.token });
        }
        return res.status(200).json({ token: user.token });
    } catch (error) {
        return res.status(500).json('An error occurred while signing the username');
    }
}
export async function logoutUser(req: CustomRequest, res: Response) {
    try {
        req.user.token = null;
        await req.user.save();
        return res.status(200).json('Logout successfully');
    } catch (error) {

    }
}
export async function forgotPassword(req: Request, res: Response) {
    const { GMAIL_APP_USER, GMAIL_APP_PASSWORD }: any = process.env;
    try {
        const { email } = req.body;
        // const user: UserInterFace | null = await UserModel.findOne({ email: email });
        // if(!user){
        //     return res.status(401).json('Email not found');
        // }
        
        const verificationCode = await Math.floor(100000 + Math.random() * 900000).toString();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_APP_USER,
                pass: GMAIL_APP_PASSWORD
            }
        });
        const mailOptions = {
            from: GMAIL_APP_USER,
            to: email,
            subject: 'Password Reset',
            text: `Your verification code is: ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
}