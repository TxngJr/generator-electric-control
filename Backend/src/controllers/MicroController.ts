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

export async function getListMicroController(req: CustomRequest, res: Response) {
    try {
        const page: number = parseInt(req.query.page as string) || 1;

        const totalCount: number = await MicroControllerModel.countDocuments();

        const skip: number = (page - 1) * 10;

        const microControllers: MicroControllerInterFace[] = await MicroControllerModel.find({ owner: req.user._id }, { _id: 1, microControllerName: 1, systemAC: 1, EnergyACPrimary: 1 }).skip(skip).limit(10);
        if (Math.ceil(totalCount / 10) < page) {
            return res.status(404).json('This page does not exist');
        }
        return res.status(200).json({
            microControllers,
            currentPage: page,
            totalPages: Math.ceil(totalCount / 10),
        });
    } catch (error) {
        return res.status(507).json('An error occurred while get the microController.');
    }
}
export async function getDataMicroController(req: CustomRequest, res: Response) {
    try {
        const { microControllerId } = req.params;
        const MicroController: MicroControllerInterFace | null = await MicroControllerModel.findOne({ _id: microControllerId, owner: req.user._id },
            {
                _id: 1,
                microControllerName: 1,
                systemAC: 1,
                VoltageACPrimary: 1,
                CurrentACPrimary: 1,
                PowerACPrimary: 1,
                EnergyACPrimary: 1,
                FrequencyACPrimary: 1,
                PowerFactorACPrimary: 1,
                VoltageACSecondary: 1,
                CurrentACSecondary: 1,
                PowerACSecondary: 1,
                EnergyACSecondary: 1,
                FrequencyACSecondary: 1,
                PowerFactorACSecondary: 1,
            });
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
        const updatedMicroController: MicroControllerInterFace | null = await MicroControllerModel.findByIdAndUpdate(microControllerId,
            {
                systemAC: update.systemAC,
                VoltageACPrimary: update.VoltageACPrimary,
                CurrentACPrimary: update.CurrentACPrimary,
                PowerACPrimary: update.PowerACPrimary,
                EnergyACPrimary: update.EnergyACPrimary,
                FrequencyACPrimary: update.FrequencyACPrimary,
                PowerFactorACPrimary: update.PowerFactorACPrimary,
                VoltageACSecondary: update.VoltageACSecondary,
                CurrentACSecondary: update.CurrentACSecondary,
                PowerACSecondary: update.PowerACSecondary,
                EnergyACSecondary: update.EnergyACSecondary,
                FrequencyACSecondary: update.FrequencyACSecondary,
                PowerFactorACSecondary: update.PowerFactorACSecondary,
            });
        if (!updatedMicroController) {
            return res.status(404).json('MicroController device not found');
        }
        return res.status(201).json('Update success');
    } catch (error) {

    }
}
