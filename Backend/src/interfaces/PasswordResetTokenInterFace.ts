import mongoose, { Document } from 'mongoose';

export interface PasswordResetTokenInterFace extends Document {
    owner?: mongoose.Types.ObjectId;
    token?: string;
    expires?: Date;
    createAt?: Date;
};