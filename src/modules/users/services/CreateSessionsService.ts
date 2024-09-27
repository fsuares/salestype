import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { sign } from 'jsonwebtoken';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Incorrect email.', 401);
        }

        const passwordConfirmation = await compare(password, user.password);
        if (!passwordConfirmation) {
            throw new AppError('Incorrect password.', 401);
        }

        const token = sign(
            {
                id: user
            },
            '752693afda35bf65d799b2361114d067',
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return { user, token };
    }
}

export default CreateSessionsService;
