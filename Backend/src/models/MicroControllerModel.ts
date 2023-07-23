import mongoose from 'mongoose';
import { MicroControllerInterFace } from '../interfaces/MicroControllerInterFace';

const MicroControllerSchema: mongoose.Schema = new mongoose.Schema({
    microControllerName: { type: String, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    systemAC: { type: Boolean, required: true, default: true },

    VoltageACPrimary: { type: Number, required: true, default: 0 },
    CurrentACPrimary: { type: Number, required: true, default: 0 },
    PowerACPrimary: { type: Number, required: true, default: 0 },
    EnergyACPrimary: { type: Number, required: true, default: 0 },
    FrequencyACPrimary: { type: Number, required: true, default: 0 },
    PowerFactorACPrimary: { type: Number, required: true, default: 0 },

    VoltageACSecondary: { type: Number, required: true, default: 0 },
    CurrentACSecondary: { type: Number, required: true, default: 0 },
    PowerACSecondary: { type: Number, required: true, default: 0 },
    EnergyACSecondary: { type: Number, required: true, default: 0 },
    FrequencyACSecondary: { type: Number, required: true, default: 0 },
    PowerFactorACSecondary: { type: Number, required: true, default: 0 },

    createAt: { type: Date, default: Date.now },
});

const MicroControllerModel = mongoose.model<MicroControllerInterFace>('MicroController', MicroControllerSchema);

export default MicroControllerModel;