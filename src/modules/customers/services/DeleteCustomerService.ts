import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
    id: string;
}

export default class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findByID(id);
        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        await customerRepository.remove(customer);
    }
}
