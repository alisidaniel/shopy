import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const dto = {
    username: 'alisidaniel',
    firtName: 'daniel',
    lastName: 'alisi',
    email: 'alisidaniel@gmail.com',
  };
  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(dto)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...dto });
      });
  });

  //   it('/users (POST) --> 400 on validation error', () => {
  //     return request(app.getHttpServer())
  //       .post('/users')
  //       .send({})
  //       .expect('Content-Type', /json/)
  //       .expect(400);
  //   });
});
