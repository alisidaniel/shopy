import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';
import { Product } from '../../product/product.entity';

Entity();
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
