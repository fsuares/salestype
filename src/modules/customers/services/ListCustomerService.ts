import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/infra/typeorm/entities/Customer';

interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number;
    next_page: number | null;
    last_page: number | null;
    data: Customer[];
}

class ListCustomerService {
    public async execute(): Promise<IPaginateCustomer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository
            .createQueryBuilder()
            .paginate();
        if (!customers) {
            throw new AppError('No customers', 404);
        }

        return customers as IPaginateCustomer;
    }
}

export default ListCustomerService;
