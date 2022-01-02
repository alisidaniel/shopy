import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(Number(id));
  }

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
