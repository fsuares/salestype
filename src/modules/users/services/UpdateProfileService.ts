import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { hash, compare } from 'bcryptjs';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password: string;
    old_password: string;
}

class UpdateProfileService {
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password
    }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByID(user_id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const userWithUpdatedEmail = await usersRepository.findByEmail(email);
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('E-mail already in use', 409);
        }

        if (password && !old_password) {
            throw new AppError('Old password is required', 400);
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError('Old password does not match', 400);
            }
            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);
        return user;
    }
}

export default UpdateProfileService;
