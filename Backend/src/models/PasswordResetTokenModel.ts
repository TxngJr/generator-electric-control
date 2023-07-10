import mongoose from 'mongoose';
import { PasswordResetTokenInterFace } from '../interfaces/PasswordResetTokenInterFace';

const PasswordResetTokenSchema: mongoose.Schema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
    createAt: { type: Date, default: Date.now },
});

const PasswordResetTokenModel = mongoose.model<PasswordResetTokenInterFace>('PasswordResetToken', PasswordResetTokenSchema);

export default PasswordResetTokenModel;