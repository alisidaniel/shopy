import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const dto = {
    username: 'alisidaniel',
    firtName: 'daniel',
    lastName: 'alisi',
    email: 'alisidaniel@gmail.com',
  };
  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    find: jest.fn(() => ({})),
    findOneOrFail: jest
      .fn()
      .mockImplementation((user) => ({ id: Date.now(), ...user })),
    remove: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return the object', async () => {
    expect(await service.createUser(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockUsersRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should query all users', async () => {
    expect(await service.findAll()).toEqual({});
    expect(mockUsersRepository.find).toBeCalled();
  });

  // it('should query for a user', async () => {
  //   expect(await service.findById(1)).toEqual({
  //     id: 1,
  //     ...dto,
  //   });
  //   expect(mockUsersRepository.findOneOrFail).toBeCalled()
  // });

  it('should update user record and return user', async () => {
    expect(await service.updateUser(Date.now(), dto)).toEqual({
      id: Date.now(),
      ...dto,
    });
  });

  // it('should delete user', async () => {
  //   expect(await service.deleteUser(1)).toEqual(dto);

  //   expect(mockUsersRepository.remove).toBeCalled();
  // });
});
