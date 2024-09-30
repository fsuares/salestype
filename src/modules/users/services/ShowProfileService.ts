import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '@users/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByID(user_id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }
}

export default ShowProfileService;
