import { Router } from 'express';

import { getRepository } from 'typeorm';
import Seller from '../models/Seller';
import CreateSellerService from '../services/CreateSellerService';
import UpdateSellerService from '../services/UpdateSellerService';

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

sellerRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const sellerRepository = getRepository(Seller);
    const checkSellerExists = await sellerRepository.findOne({
      where: { id },
    });

    if (!checkSellerExists) {
      throw new Error('Sellers not found');
    }

    sellerRepository.createQueryBuilder()
      .delete()
      .from(Seller)
      .where("id = :id", { id: id })
      .execute();

    return response.json();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

sellerRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      cellphone,
      email
    } = request.body;

    const updateSeller= new UpdateSellerService();

    const seller = await updateSeller.execute({
      id,
      name,
      cellphone,
      email
    });

    return response.json(seller);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

});

export default sellerRouter;
