import { Request, Response } from 'express';
import CreateCustomerService from '@customers/services/CreateCustomerService';
import ListCustomerService from '@customers/services/ListCustomerService';
import ShowCustomerService from '@customers/services/ShowCustomerService';
import UpdateCustomerService from '@customers/services/UpdateCustomerService';
import DeleteCustomerService from '@customers/services/DeleteCustomerService';

export default class CustomersController {
    public async index(req: Request, res: Response): Promise<any> {
        const customers = await new ListCustomerService()
            .execute()
            .then((customers) => {
                return res.status(200).json(customers);
            });
    }

    public async show(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const customer = await new ShowCustomerService()
            .execute({ id })
            .then((customer) => {
                return res.status(200).json(customer);
            });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { name, email } = req.body;
        const customer = await new CreateCustomerService()
            .execute({ name, email })
            .then((customer) => {
                return res.status(201).json(customer);
            });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { name, email } = req.body;
        const customer = await new UpdateCustomerService()
            .execute({ id, name, email })
            .then((customer) => {
                return res.status(202).json(customer);
            });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const customer = await new DeleteCustomerService()
            .execute({ id })
            .then(() => {
                return res.status(204).json();
            });
    }
}
