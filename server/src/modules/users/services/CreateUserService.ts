import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    login,
    name,
    password,
    phoneNumber,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByLogin({ login });

    if (checkUserExists) {
      throw new AppError(400, 'Este login já está sendo utilizado');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      login,
      name,
      password: hashedPassword,
      phoneNumber,
    });

    return user;
  }
}

export default CreateUserService;
