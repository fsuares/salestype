import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import ListUserService from '@users/services/ListUserService';
import CreateUserService from '@users/services/CreateUserService';

export default class UsersController {
    public async index(req: Request, res: Response): Promise<any> {
        const listUserService = new ListUserService();
        const users = await listUserService.execute();
        return res.status(200).json(instanceToInstance(users));
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return res.status(200).json(instanceToInstance(user));
    }
}
