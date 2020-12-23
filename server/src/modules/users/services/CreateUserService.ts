import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

class CreateUserService {
  public async execute({
    login,
    name,
    password,
    phoneNumber,
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { login },
    });

    if (checkUserExists) {
      throw new AppError(400, 'Este login já está sendo utilizado');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      login,
      name,
      password: hashedPassword,
      phoneNumber,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
