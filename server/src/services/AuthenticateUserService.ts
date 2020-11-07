import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new AppError(400, 'Combinação Login/Senha inválida.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(400, 'Combinação Login/Senha inválida.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
