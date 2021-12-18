import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }
}
