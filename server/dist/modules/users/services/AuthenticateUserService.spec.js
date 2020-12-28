"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      login: 'teste',
      name: 'Usuário de testes',
      password: '1234',
      phoneNumber: '1'
    });
    const response = await authenticateUser.execute({
      login: 'teste',
      password: '1234'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });
  it('should not be able to authenticate an user with invalid login', async () => {
    await expect(authenticateUser.execute({
      login: 'login inválido',
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate an user with wrong password', async () => {
    await fakeUsersRepository.create({
      login: 'teste',
      name: 'Usuário de testes',
      password: '1234',
      phoneNumber: '1'
    });
    await expect(authenticateUser.execute({
      login: 'teste',
      password: 'senha inválida'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate an user if app secret is not found', async () => {
    await fakeUsersRepository.create({
      login: 'teste',
      name: 'Usuário de testes',
      password: '1234',
      phoneNumber: '1'
    });
    jest.mock("../../../config/auth");
    _auth.default.jwt.secret = '';
    await expect(authenticateUser.execute({
      login: 'teste',
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});