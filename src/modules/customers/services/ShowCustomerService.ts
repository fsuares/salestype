import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/infra/typeorm/entities/Customer';
import { ICustomerID } from '@customers/domain/models/ICustomerID';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: CustomersRepository
    ) {}
    public async execute({ id }: ICustomerID): Promise<Customer> {
        const customer = await this.customerRepository.findByID(id);
        if (!customer) {
            throw new AppError('customer not found', 404);
        }

        return customer;
    }
}

export default ShowCustomerService;
