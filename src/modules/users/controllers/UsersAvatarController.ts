import { Request, Response } from 'express';
import UpdateUserAvatar from '../services/UpdateUserAvatarService';

export default class UsersAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateUserAvatar = new UpdateUserAvatar();
        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename || ''
        });
        return res.status(201).json(user);
    }
}
