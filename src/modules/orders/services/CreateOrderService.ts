import AppError from '@shared/errors/AppError';
import { OrdersRepository } from '@orders/typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Order from '@orders/typeorm/entities/Order';

interface IProduct {
    product_id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findByID(customer_id);
        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id');
        }

        const productsExists = await productsRepository.findAllByIds(products);
        if (!productsExists.length) {
            throw new AppError(
                'Could not find any products with the given ids'
            );
        }

        const productsExistsIds = productsExists.map((product) => product.id);
        const checkInexistentProducts = products.filter((product) =>
            productsExistsIds.includes(product.product_id)
        );

        if (!checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0].product_id}`
            );
        }

        const quantityAvailable = products.filter(
            (product) =>
                productsExists.filter((p) => p.id === product.product_id)[0]
                    .quantity < product.quantity
        );
        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
				is not available for ${quantityAvailable[0].product_id}`
            );
        }

        const serializedProducts = products.map((products) => ({
            product_id: products.product_id,
            quantity: products.quantity,
            price: productsExists.filter((p) => p.id === products.product_id)[0]
                .price
        }));

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts
        });
        if (!order) {
            throw new AppError('Order creation failed');
        }

        const { order_products } = order;

        const orderedProductsQuantity = order_products.map((product) => ({
            id: product.product_id,
            quantity:
                productsExists.filter((p) => p.id === product.product_id)[0]
                    .quantity - product.quantity
        }));

        await productsRepository.save(orderedProductsQuantity);
        return order;
    }
}

export default CreateOrderService;
