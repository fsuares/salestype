import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '@products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@products/typeorm/entities/Product';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const productExists = await productsRepository.findByName(name);
        if (productExists) {
            throw new AppError(
                'There is already a product with this name',
                409
            );
        }

        const product = productsRepository.create({
            name,
            price,
            quantity
        });
        await productsRepository.save(product);
        return product;
    }
}

export default CreateProductService;
