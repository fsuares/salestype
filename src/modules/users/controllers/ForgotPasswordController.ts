import { Request, Response } from 'express';
import SendForgotPassEmailService from '../services/SendForgotPassEmailService';
export default class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        const sendForgotPassEmail = new SendForgotPassEmailService();
        await sendForgotPassEmail.execute({ email });
        return res.status(204).send();
    }
}
