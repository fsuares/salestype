import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { log } from 'console';
import { template } from 'handlebars';

interface IRequest {
    email: string;
}

class SendForgotPassEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const token = await userTokensRepository.generate(user.id);
        const forgotPassTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[Salestype] - Password Recovery',
            templateData: {
                file: forgotPassTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token.token}`
                }
            }
        });
    }
}

export default SendForgotPassEmailService;
