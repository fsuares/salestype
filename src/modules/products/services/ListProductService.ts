import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const products = await productsRepository.find();
        if (!products) {
            throw new AppError('Products not found', 404);
        }
        return products;
    }
}

export default ListProductService;
