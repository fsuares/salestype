import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
    public async index(req: Request, res: Response): Promise<Response | void> {
        const products = await new ListProductService()
            .execute()
            .then((products) => {
                return res.status(200).json(products);
            });
    }

    public async show(req: Request, res: Response): Promise<Response | void> {
        const { id } = req.params;
        const product = await new ShowProductService()
            .execute({ id })
            .then((product) => {
                return res.status(200).json(product);
            });
    }

    public async create(req: Request, res: Response): Promise<Response | void> {
        const { name, price, quantity } = req.body;
        const product = await new CreateProductService()
            .execute({ name, price, quantity })
            .then((product) => {
                return res.status(201).json(product);
            });
    }

    public async update(req: Request, res: Response): Promise<Response | void> {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const product = await new UpdateProductService()
            .execute({ id, name, price, quantity })
            .then((product) => {
                return res.status(202).json(product);
            });
    }

    public async delete(req: Request, res: Response): Promise<Response | void> {
        const { id } = req.params;
        const product = await new DeleteProductService()
            .execute({ id })
            .then(() => {
                return res.status(204).json();
            });
    }
}
