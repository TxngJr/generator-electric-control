import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { UserInterFace } from '../interfaces/UserUserInterFace';
import nodemailer from 'nodemailer';
import PasswordResetTokenModel from '../models/PasswordResetTokenModel';
import { PasswordResetTokenInterFace } from '../interfaces/PasswordResetTokenInterFace';

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
export async function getCodeForResetPassword(req: Request, res: Response) {
    const { GMAIL_APP_USER, GMAIL_APP_PASSWORD }: any = process.env;
    try {
        const { email } = req.body;
        const user: UserInterFace | null = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json('Email not found');
        }
        const verificationCode = await Math.floor(100000 + Math.random() * 900000).toString();

        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const passwordResetToken = new PasswordResetTokenModel({
            owner: user._id,
            token: verificationCode,
            expires: expirationTime,
        });

        await passwordResetToken.save();

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
        res.status(200).json('Verification code sent successfully');
    } catch (error) {
        res.status(500).json('An error occurred while sending the email');
    }
}
export async function ResetPassword(req: Request, res: Response) {
    try {
        const { email, code, newPassword } = req.body;
        let passwordResetToken: PasswordResetTokenInterFace | any = await PasswordResetTokenModel.findOne({ token: code })
            .populate('owner')
            .exec();
        if (!passwordResetToken || passwordResetToken.expires < new Date()) {
            return res.status(400).json('Invalid verification code');
        }
        if (passwordResetToken.owner.email !== email) {
            return res.status(400).json('Email and verification code do not match');
        }

        const hashPassword = await bcryptjs.hashSync(newPassword, 10);
        let user = passwordResetToken.owner;
        user.hashPassword = hashPassword;
        await user.save();

        await passwordResetToken.deleteOne();

        return res.status(200).json('Password reset successful');
    } catch (error) {
        return res.status(500).json('An error occurred while resetting the password');
    }
}