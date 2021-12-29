import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsEmail, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Cat } from 'src/cat/entities/cat.entity';

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
  photo: string;

  @ApiProperty()
  @Length(4, 15)
  @Column()
  phone: number;

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @ApiProperty()
  @OneToMany(() => Cat, (cat) => cat.user)
  cats?: Cat[];

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
