import { container } from 'tsyringe';
import { ICustomersRepository } from '@customers/domain/repositories/ICustomersRepository';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository',
    CustomersRepository
);
