import { Request, Response } from 'express';
import UpdateUserAvatar from '@users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UsersAvatarController {
    public async update(req: Request, res: Response): Promise<any> {
        const updateUserAvatar = new UpdateUserAvatar();
        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename || ''
        });
        return res.status(201).json(instanceToInstance(user));
    }
}
