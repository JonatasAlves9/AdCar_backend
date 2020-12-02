import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, cellphone, password } = request.body;
    const createUser = new CreateUserService();

    const nameLowerCased = name.toLowerCase();
    const emailLowerCased = email.toLowerCase();

    const user = await createUser.execute({
      name: nameLowerCased,
      email: emailLowerCased,
      cellphone,
      password,
    });
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
