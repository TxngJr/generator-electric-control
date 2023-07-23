import mongoose, { Document } from 'mongoose';

export interface MicroControllerInterFace extends Document {
    microControllerName?: string;
    owner?: mongoose.Types.ObjectId;
    systemAC?:boolean;
    VoltageACPrimary?:Number;
    CurrentACPrimary?:Number;
    PowerACPrimary?:Number;
    EnergyACPrimary?:Number;
    FrequencyACPrimary?:Number;
    PowerFactorACPrimary?:Number;
    VoltageACSecondary?:Number;
    CurrentACSecondary?:Number;
    PowerACSecondary?:Number;
    EnergyACSecondary?:Number;
    FrequencyACSecondary?:Number;
    PowerFactorACSecondary?:Number;
    createAt?:Date;
};