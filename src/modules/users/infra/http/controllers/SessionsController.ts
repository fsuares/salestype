import { instanceToInstance } from 'class-transformer';
import CreateSession from '@users/services/CreateSessionsService';
import { Request, Response } from 'express';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;

        const createSession = new CreateSession();

        const { user, token } = await createSession.execute({
            email,
            password
        });

        const user_no_pass = instanceToInstance(user);

        return res.status(202).json({ user_no_pass, token });
    }
}
