import CreateSession from '../services/CreateSessionsService';
import { Request, Response } from 'express';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSession = new CreateSession();

        const { user, token } = await createSession.execute({
            email,
            password
        });

        return res.status(202).json({ user, token });
    }
}
