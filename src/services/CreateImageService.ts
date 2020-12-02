/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Images from '../models/Images';

interface Request {
  idCar: string;
  url: string;
}

class cleateImageservice {
  public async execute({ idCar, url }: Request): Promise<Images> {
    const imagesRepository = getRepository(Images);

    const images = imagesRepository.create({
      car_id: idCar,
      url,
    });

    await imagesRepository.save(images);

    return images;
  }
}

export default cleateImageservice;
