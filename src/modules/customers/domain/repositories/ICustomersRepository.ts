import { ICustomer } from '../models/ICustomer';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { IPaginatedCustomer } from '../models/IPaginatedCustomer';

export interface ICustomersRepository {
    findByID(id: string): Promise<ICustomer | undefined>;
    findByName(name: string): Promise<ICustomer | undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    findAll(): Promise<IPaginatedCustomer>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
}
