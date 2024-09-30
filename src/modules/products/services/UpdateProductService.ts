import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '@products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@products/typeorm/entities/Product';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }

        const productExists = await productsRepository.findByName(name);
        if (productExists && name != product.name) {
            throw new AppError(
                'There is already a product with this name',
                409
            );
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
