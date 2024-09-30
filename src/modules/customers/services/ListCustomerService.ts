import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/typeorm/entities/Customer';

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customers = await customerRepository.find();
        if (!customers) {
            throw new AppError('No customers', 404);
        }

        return customers;
    }
}

export default ListCustomerService;
