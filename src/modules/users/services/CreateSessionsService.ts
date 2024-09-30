import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '@users/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

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
            authConfig.jwt.secret,
            {
                subject: user.id,
                expiresIn: authConfig.jwt.expiresIn
            }
        );

        return { user, token };
    }
}

export default CreateSessionsService;
