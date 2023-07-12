import mongoose from 'mongoose';
import { MicroControllerInterFace } from '../interfaces/MicroControllerInterFace';

const MicroControllerSchema: mongoose.Schema = new mongoose.Schema({
    microControllerName: { type: String, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    systemAC: { type: Boolean, required: true, default: true },
    readACPrimary: { type: Number, required: true, default: 0 },
    readACSecondary: { type: Number, required: true, default: 0 },
    createAt: { type: Date, default: Date.now },
});

const MicroControllerModel = mongoose.model<MicroControllerInterFace>('MicroController', MicroControllerSchema);

export default MicroControllerModel;