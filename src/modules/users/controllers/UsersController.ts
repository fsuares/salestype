import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUserService = new ListUserService();
        const users = await listUserService.execute();
        return res.status(200).json(users);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return res.status(200).json(user);
    }
}
