import { Router } from 'express';

import { getRepository } from 'typeorm';
import Seller from '../models/Seller';
import CreateSellerService from '../services/CreateSellerService';

const sellerRouter = Router();

sellerRouter.get('/', async (request, response) => {
  try {
    const sellersRepository = getRepository(Seller);
    const sellers = await sellersRepository.find();

    return response.json(sellers);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

sellerRouter.post('/', async (request, response) => {
  try {
    const { name, email, cellphone } = request.body;
    const nameLowerCased = name.toLowerCase();
    const emailLowerCased = email.toLowerCase();

    const createSeller = new CreateSellerService();

    const seller = await createSeller.execute({
      name: nameLowerCased,
      email: emailLowerCased,
      cellphone,
    });

    return response.json(seller);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sellerRouter;
