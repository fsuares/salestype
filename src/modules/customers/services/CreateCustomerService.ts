import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@customers/typeorm/entities/Customer';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const emailExists = await customerRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email is already use', 409);
        }

        const customer = customerRepository.create({
            name,
            email
        });

        await customerRepository.save(customer);
        return customer;
    }
}

export default CreateCustomerService;
