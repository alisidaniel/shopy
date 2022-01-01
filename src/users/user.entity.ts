import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsEmail, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/order.entity';
import { Cat } from '../cat/cat.entity';
import { Product } from '../product/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  @Length(4, 20)
  username: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  photo?: string;

  @ApiProperty()
  @Length(4, 15)
  @Column()
  phone?: number;

  @ApiProperty({ type: () => Product })
  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];

  @ApiProperty({ type: () => Order })
  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @ApiProperty({ type: () => Cat })
  @OneToMany(() => Cat, (cat) => cat.user)
  cats?: Cat[];

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
