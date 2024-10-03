import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IPaginatedCustomer } from '@customers/domain/models/IPaginatedCustomer';
import { ISearchParams } from '@customers/domain/models/ISearchParams';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) {}

    public async execute(): Promise<IPaginatedCustomer> {
        const customers = await this.customersRepository.findAll();
        return customers;
    }
}

export default ListCustomerService;
