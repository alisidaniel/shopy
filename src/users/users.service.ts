import { Injectable } from '@nestjs/common';
// import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    try {
      const user = this.userRepository.findOneOrFail(id);
      console.log('hello am testing', user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // await this.userRepository.update(id, { ...updateUserDto });
    const user = await this.findById(id);
    user.username = updateUserDto.username;
    user.firstName = updateUserDto.firtName;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.userRepository.remove(user);
  }
}
