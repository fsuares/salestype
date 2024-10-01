import { EntityRepository, Repository } from 'typeorm';
import Order from '@orders/typeorm/entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        return this.findOne(id, {
            relations: ['customer', 'order_products']
        });
    }

    public async createOrder({
        customer,
        products
    }: IRequest): Promise<Order | undefined> {
        const order = await this.create({
            customer,
            order_products: products
        });
        await this.save(order);
        return order;
    }
}
