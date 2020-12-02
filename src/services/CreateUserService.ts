/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  cellphone: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    cellphone,
    password,
  }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const findUserInSameDate = await userRepository.findByEmail(email);
    if (findUserInSameDate) {
      throw Error('this user is already booked');
    }

    const user = userRepository.create({
      name,
      email,
      cellphone,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
