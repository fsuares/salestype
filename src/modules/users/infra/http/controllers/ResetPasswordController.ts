import { Request, Response } from 'express';
import ResetPasswordService from '@users/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<any> {
        const { token, password } = req.body;
        const resetPassword = new ResetPasswordService();
        await resetPassword.execute({ token, password });
        return res.status(204).send();
    }
}
