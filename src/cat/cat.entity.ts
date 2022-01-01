import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('simple-json')
  product: { id: string; variationId: string };

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.cats)
  user: User;

  @ApiProperty()
  @Column()
  total: number;

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
