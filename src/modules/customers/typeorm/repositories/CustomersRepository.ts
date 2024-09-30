import { EntityRepository, Repository } from 'typeorm';
import Customer from '@customers/typeorm/entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
    public async findByID(id: string): Promise<Customer | undefined> {
        return this.findOne({
            where: {
                id
            }
        });
    }

    public async findByName(name: string): Promise<Customer | undefined> {
        return this.findOne({
            where: {
                name
            }
        });
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        return this.findOne({
            where: {
                email
            }
        });
    }
}
