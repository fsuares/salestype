import { Router } from 'express';
import ForgotPasswordController from '@users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@users/infra/http/controllers/ResetPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        }
    }),
    forgotPasswordController.create
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            passwordConfirmation: Joi.string()
                .required()
                .valid(Joi.ref('password'))
        }
    }),
    resetPasswordController.create
);

export default passwordRouter;
