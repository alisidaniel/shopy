import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('simple-json')
  product: { id: string; variationId: string };

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.cats)
  user: string;

  @ApiProperty()
  @Column()
  total: number;

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
