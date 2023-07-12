import { Request, Response } from 'express';
import MicroControllerModel from '../models/MicroControllerModel';
import UserModel from '../models/UserModel';
import bcryptjs from 'bcryptjs';
import { MicroControllerInterFace } from '../interfaces/MicroControllerInterFace';
import { UserInterFace } from '../interfaces/UserUserInterFace';

interface CustomRequest extends Request {
    user?: any;
}

export async function registerMicroController(req: Request, res: Response) {
    try {
        const { microControllerName, username, password }: { microControllerName?: string, username?: string, password?: string } = req.body;
        if (!(microControllerName && username && password)) {
            return res.status(406).json('Please provide a vaild microControllerName, username and password.');
        }
        const user: UserInterFace | null = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json('Username or password wrong.');
        }
        const checkPassword = await bcryptjs.compareSync(password, user.hashPassword);
        if (!checkPassword) {
            return res.status(404).json('Username or password wrong.');
        }

        const microControllerSave: MicroControllerInterFace | null = await MicroControllerModel.create({ microControllerName: microControllerName, owner: user._id });
        if (!microControllerSave) {
            return res.status(507).json('An error occurred while register the microController.');
        }
        return res.status(201).json({ id: microControllerSave._id });
    } catch (error) {
        return res.status(507).json('An error occurred while register the microController.');
    }
}

export async function getDataMicroController(req: CustomRequest, res: Response) {
    try {
        const { microControllerId } = req.params;
        const MicroController = await MicroControllerModel.findOne({ _id: microControllerId, owner: req.user._id });
        if (!MicroController) {
            return res.status(404).json('MicroController device not found');
        }
        return res.status(200).json(MicroController);
    } catch (error) {
        return res.status(507).json('An error occurred while get the microController.');
    }
}

export async function putDataMicroController(req: Request, res: Response) {
    try {
        const { microControllerId } = req.params;
        const update: Partial<MicroControllerInterFace> = req.body;
        const updatedMicroController = await MicroControllerModel.findByIdAndUpdate(microControllerId, { systemAC: update.systemAC, readACPrimary: update.readACPrimary, readACSecondary: update.readACSecondary, });
        if (!updatedMicroController) {
            return res.status(404).json('MicroController device not found');
        }
        return res.status(201).json('Update success');
    } catch (error) {

    }
}