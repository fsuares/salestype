import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/database';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use(
    (error: Error, _req: Request, res: Response, next: NextFunction): any => {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                status: 'error',
                message: error.message
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
);

app.listen(process.env.API_PORT || 3333, () => {
    console.log('Server started on port 3333! 🚀');
});
