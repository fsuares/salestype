import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '@users/typeorm/entities/User';

class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();
        if (!users) {
            throw new AppError('No users', 404);
        }

        return users;
    }
}

export default ListUserService;
