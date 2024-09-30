import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '@users/typeorm/entities/User';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByID(user_id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );

            const userAvatarFileExists =
                await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
