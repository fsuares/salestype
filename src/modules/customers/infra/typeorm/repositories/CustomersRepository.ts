import { getRepository, Repository } from 'typeorm';
import { ICustomersRepository } from '@customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@customers/domain/models/ICreateCustomer';
import { IPaginatedCustomer } from '@customers/domain/models/IPaginatedCustomer';
import { ISearchParams } from '@customers/domain/models/ISearchParams';
import Customer from '@customers/infra/typeorm/entities/Customer';

export class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;
    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async findByID(id: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({
            where: {
                id
            }
        });
    }

    public async findByName(name: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({
            where: {
                name
            }
        });
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({
            where: {
                email
            }
        });
    }

    public async findAll(): Promise<IPaginatedCustomer> {
        const customers = await this.ormRepository
            .createQueryBuilder()
            .paginate();

        return customers as IPaginatedCustomer;
    }

    public async create(data: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create(data);
        await this.ormRepository.save(customer);
        return customer;
    }

    public async save(data: Customer): Promise<Customer> {
        return this.ormRepository.save(data);
    }

    public async remove(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}
