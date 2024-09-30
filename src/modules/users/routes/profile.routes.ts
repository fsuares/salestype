import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '@users/controllers/ProfileController';
import isAuthenticated from '@shared/http/middlewares/isAtuhenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.patch(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            old_password: Joi.string().optional(),
            password: Joi.string(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required()
                })
        }
    }),
    profileController.update
);

export default profileRouter;
