import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '@products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@products/typeorm/entities/Product';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return product;
    }
}

export default ShowProductService;
