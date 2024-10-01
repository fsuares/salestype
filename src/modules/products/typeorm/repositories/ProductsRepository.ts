import { EntityRepository, In, Repository } from 'typeorm';
import Product from '@products/typeorm/entities/Product';

interface IFindProducts {
    product_id: string;
}

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({
            where: {
                name
            }
        });
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map((product) => product.product_id);
        const productsExists = await this.find({
            where: {
                id: In(productIds)
            }
        });

        return productsExists;
    }
}
