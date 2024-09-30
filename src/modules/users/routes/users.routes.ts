import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@users/controllers/UsersController';
import UsersAvatarController from '@users/controllers/UsersAvatarController';
import isAuthenticated from '@shared/http/middlewares/isAtuhenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
);

export default usersRouter;
