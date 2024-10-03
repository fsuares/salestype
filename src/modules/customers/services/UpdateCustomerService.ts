import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/infra/typeorm/entities/Customer';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findByID(id);
        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        const customerWithUpdatedEmail =
            await customerRepository.findByEmail(email);
        if (customerWithUpdatedEmail && customerWithUpdatedEmail.id !== id) {
            throw new AppError('E-mail already in use', 409);
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);
        return customer;
    }
}

export default UpdateCustomerService;
