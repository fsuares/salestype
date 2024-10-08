import { Request, Response } from 'express';
import ShowProfileService from '@users/services/ShowProfileService';
import UpdateProfileService from '@users/services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
    public async show(req: Request, res: Response): Promise<any> {
        const showProfileService = new ShowProfileService();
        const user_id = req.user.id;
        const user = await showProfileService.execute({ user_id });
        return res.status(200).json(instanceToInstance(user));
    }

    public async update(req: Request, res: Response): Promise<any> {
        const user_id = req.user.id;
        const { name, email, password, old_password } = req.body;

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password
        });

        return res.status(200).json(instanceToInstance(user));
    }
}
