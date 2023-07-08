import mongoose from 'mongoose';
import { UserInterFace } from '../interfaces/UserUserInterFace';

const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true, unique: true },
    token: { type: String, default: null },
    createAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<UserInterFace>('User', UserSchema);

export default UserModel;