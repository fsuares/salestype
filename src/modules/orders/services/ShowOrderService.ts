import AppError from '@shared/errors/AppError';
import { OrdersRepository } from '@orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import Order from '@orders/typeorm/entities/Order';

interface IRequest {
    id: string;
}

class CreateOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);
        if (!order) {
            throw new AppError('Order not found', 404);
        }

        return order;
    }
}

export default CreateOrderService;
