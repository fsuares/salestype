import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/infra/typeorm/entities/Customer';
import { IUpdateCustomer } from '@customers/domain/models/IUpdateCustomer';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: CustomersRepository
    ) {}

    public async execute({
        id,
        name,
        email
    }: IUpdateCustomer): Promise<Customer> {
        const customer = await this.customerRepository.findByID(id);
        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        const customerWithUpdatedEmail =
            await this.customerRepository.findByEmail(email);
        if (customerWithUpdatedEmail && customerWithUpdatedEmail.id !== id) {
            throw new AppError('E-mail already in use', 409);
        }

        customer.name = name;
        customer.email = email;

        await this.customerRepository.save(customer);
        return customer;
    }
}

export default UpdateCustomerService;
