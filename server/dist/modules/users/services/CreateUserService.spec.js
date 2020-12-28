"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1'
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
      phoneNumber: '1'
    });
    await expect(createUser.execute({
      login: 'teste',
      name: 'Usuário de testes',
      password: '123123',
      phoneNumber: '1'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});