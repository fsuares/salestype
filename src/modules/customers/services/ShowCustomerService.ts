import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/typeorm/entities/Customer';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findByID(id);
        if (!customer) {
            throw new AppError('customer not found', 404);
        }

        return customer;
    }
}

export default ShowCustomerService;
