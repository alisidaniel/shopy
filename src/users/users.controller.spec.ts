import { Test, TestingModule } from '@nestjs/testing';
// import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserService = {};
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

  // it('it should create', () => {
  //   // const CrudRequest = {
  //   //   username: '',
  //   // };
  //   // expect(controller.service.createOne(CrudRequest, User));
  // });
});
