import { Request, Response } from 'express';
import ListProductService from '@products/services/ListProductService';
import ShowProductService from '@products/services/ShowProductService';
import CreateProductService from '@products/services/CreateProductService';
import UpdateProductService from '@products/services/UpdateProductService';
import DeleteProductService from '@products/services/DeleteProductService';

export default class ProductsController {
    public async index(_req: Request, res: Response): Promise<any> {
        const products = await new ListProductService()
            .execute()
            .then((products) => {
                return res.status(200).json(products);
            });
    }

    public async show(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await new ShowProductService()
            .execute({ id })
            .then((product) => {
                return res.status(200).json(product);
            });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { name, price, quantity } = req.body;
        const product = await new CreateProductService()
            .execute({ name, price, quantity })
            .then((product) => {
                return res.status(201).json(product);
            });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const product = await new UpdateProductService()
            .execute({ id, name, price, quantity })
            .then((product) => {
                return res.status(202).json(product);
            });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await new DeleteProductService()
            .execute({ id })
            .then(() => {
                return res.status(204).json();
            });
    }
}
