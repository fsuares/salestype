import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { ICreateCustomer } from '@customers/domain/models/ICreateCustomer';
import { ICustomer } from '@customers/domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: CustomersRepository
    ) {}

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const emailExists = await this.customerRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email is already use', 409);
        }

        const customer = await this.customerRepository.create({
            name,
            email
        });

        return customer;
    }
}

export default CreateCustomerService;
