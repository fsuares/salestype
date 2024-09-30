import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAtuhenticated';

const customerRouter = Router();
const customerController = new CustomersController();
customerRouter.use(isAuthenticated);

customerRouter.get('/', customerController.index);

customerRouter.get('/:id', customerController.show);

customerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required()
        }
    }),
    customerController.create
);

customerRouter.patch(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string()
        }
    }),
    customerController.update
);

customerRouter.delete('/:id', customerController.delete);

export default customerRouter;
