import { json, response } from 'express';
import { getRepository, getConnection } from 'typeorm';

import Image from '../models/Images';

interface Request {
  id: string;
}

class UpdateCarService {
  public async execute({
    id,
  }: Request) {
    try {
      const imageRepository = getRepository(Image);

      const checkImageExists = await imageRepository.findOne({
        where: { id },
      });
      console.log(!checkImageExists)
  
      if (!checkImageExists) {
        console.log("Chegou aqui")
        throw new Error('Email adress already used.');
      }
  
      imageRepository.createQueryBuilder()
        .delete()
        .from(Image)
        .where("id = :id", { id: id })
        .execute();
  

        return (204);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

  }
}

export default UpdateCarService;