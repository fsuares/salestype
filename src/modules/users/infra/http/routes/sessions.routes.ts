import { Router } from 'express';
import SessionsController from '@users/infra/http/controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionsController.create
);

export default sessionsRouter;
