import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@users/infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@users/infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email is already use', 409);
        }

        const hashedPassword = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });
        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
