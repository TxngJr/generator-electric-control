import mongoose from 'mongoose';
import { UserInterFace } from '../interfaces/UserUserInterFace';

const MicroControllerSchema: mongoose.Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    systemAC: { type: Boolean, required: true, default: true },
    readACPrimary: { type: Number, required: true, default: 0 },
    readACSecondary: { type: Number, required: true, default: 0 },
    createAt: { type: Date, default: Date.now },
});


const MicroControllerModel = mongoose.model<UserInterFace>('User', MicroControllerSchema);

export default MicroControllerModel;