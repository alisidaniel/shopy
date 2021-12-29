import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

@Entity()
export class Category {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column('simple-array')
  subCategory: string[];

  @ApiProperty()
  @Column()
  @IsDate()
  createDate: Date;
}
