/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Seller from '../models/Seller';

interface Request {
  name: string;
  email: string;
  cellphone: string;
}

class createSellerService {
  public async execute({ name, email, cellphone }: Request): Promise<Seller> {
    const sellersRepository = getRepository(Seller);
    const checkSellerExists = await sellersRepository.findOne({
      where: { email },
    });

    if (checkSellerExists) {
      throw new Error('Email adress already used.');
    }

    const seller = sellersRepository.create({
      name,
      email,
      cellphone,
    });

    await sellersRepository.save(seller);

    return seller;
  }
}

export default createSellerService;
