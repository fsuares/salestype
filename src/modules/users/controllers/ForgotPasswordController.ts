import { Request, Response } from 'express';
import SendForgotPassEmailService from '@users/services/SendForgotPassEmailService';
export default class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<any> {
        const { email } = req.body;
        const sendForgotPassEmail = new SendForgotPassEmailService();
        await sendForgotPassEmail.execute({ email });
        return res.status(204).send();
    }
}
