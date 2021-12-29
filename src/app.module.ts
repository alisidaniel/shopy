import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { CatModule } from './cat/cat.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductModule,
    CategoryModule,
    CatModule,
    OrderModule,
  ],
  providers: [CategoryService],
})
export class AppModule {}
