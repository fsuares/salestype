import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlenarsMailTemplate';

interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    from?: IMailContact;
    to: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData
    }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Team Salestype',
                address: from?.email || 'team@salestype.com'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });
    }
}
