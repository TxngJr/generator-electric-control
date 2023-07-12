import mongoose, { Document } from 'mongoose';

export interface MicroControllerInterFace extends Document {
    microControllerName?: string;
    owner?: mongoose.Types.ObjectId;
    systemAC?:boolean;
    readACPrimary?:Number;
    readACSecondary?:Number;
    createAt?:Date;
};