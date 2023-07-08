import { Document } from 'mongoose';

export interface UserInterFace extends Document {
    username?: string;
    email?: string;
    hashPassword?: string | any;
    token?: string | null;
    createAt?: Date;
};