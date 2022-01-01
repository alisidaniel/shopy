import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsInt, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/order.entity';
import { User } from '../users/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ApiProperty({ type: () => Order })
  @OneToMany(() => Order, (order) => order.product)
  orders?: Order[];

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
