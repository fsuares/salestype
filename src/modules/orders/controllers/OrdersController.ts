import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
    public async show(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const order = await new ShowOrderService()
            .execute({ id })
            .then((order) => {
                return res.status(200).json(order);
            });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { customer_id, products } = req.body;
        const order = await new CreateOrderService()
            .execute({ customer_id, products })
            .then((order) => {
                return res.status(201).json(order);
            });
    }
}
