import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '@customers/infra/typeorm/repositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomerID } from '@customers/domain/models/ICustomerID';

@injectable()
export default class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private ormRepository: CustomersRepository
    ) {}

    public async execute({ id }: ICustomerID): Promise<void> {
        const customer = await this.ormRepository.findByID(id);
        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        await this.ormRepository.remove(customer);
    }
}
