import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { login, name, password, phoneNumber } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      login,
      name,
      password,
      phoneNumber,
    });

    // delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
