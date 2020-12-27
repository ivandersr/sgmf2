import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1',
    });

    expect(user).toHaveProperty('id');
    expect(user.login).toBe('teste');
    expect(user.name).toBe('Usuário de testes');
    expect(user.phoneNumber).toBe('1');
  });

  it('should not create an user with existing login', async () => {
    await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1',
    });

    await expect(
      createUser.execute({
        login: 'teste',
        name: 'Usuário de testes',
        password: '123123',
        phoneNumber: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
