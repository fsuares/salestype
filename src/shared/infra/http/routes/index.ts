import { Router } from 'express';
import productsRouter from '@products/infra/http/routes/products.routes';
import usersRouter from '@users/infra/http/routes/users.routes';
import sessionsRouter from '@users/infra/http/routes/sessions.routes';
import passwordRouter from '@users/infra/http/routes/password.routes';
import profileRouter from '@users/infra/http/routes/profile.routes';
import customerRouter from '@customers/infra/http/routes/customers.routes';
import ordersRouter from '@orders/infra/http/routes/orders.routes';

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
