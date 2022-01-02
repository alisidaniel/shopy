import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const dto = {
    username: 'alisidaniel',
    firtName: 'daniel',
    lastName: 'alisi',
    email: 'alisidaniel@gmail.com',
  };
  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    updateUser: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    findAll: jest.fn(() => ({})),
    findById: jest.fn().mockImplementation((id) => ({ id, ...dto })),
    deleteUser: jest.fn().mockImplementation((id) => ({ id, ...dto })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', () => {
    expect(controller.createUser(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    expect(controller.updateUser(1, dto)).toEqual({ id: 1, ...dto });

    expect(mockUserService.updateUser).toHaveBeenCalled();
  });

  it('should query users', () => {
    expect(controller.getUsers()).toEqual({});

    expect(mockUserService.findAll).toBeCalled();
  });

  it('should query user', () => {
    expect(controller.getUserById('1')).toEqual({ id: 1, ...dto });
    expect(mockUserService.findById).toBeCalled();
  });

  it('should delete user', () => {
    expect(controller.deleteUser(1)).toEqual({ id: 1, ...dto });

    expect(mockUserService.deleteUser).toHaveBeenCalled();
  });
});
