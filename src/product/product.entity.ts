import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsInt, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/entities/order.entity';

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

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.product)
  orders?: Order[];

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
