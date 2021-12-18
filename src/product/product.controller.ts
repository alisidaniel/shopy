import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Crud({
  model: {
    type: Product,
  },
})
@Controller('product')
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}
