import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateImagesService from '../services/CreateImageService';
import DeleteImageService from '../services/DeleteImageService';
import Image from '../models/Images';
import Car from '../models/Car';

const imagesRouter = Router();

imagesRouter.get('/', async (request, response) => {
  const imagesRepository = getRepository(Image);
  const images = await imagesRepository.find();

  return response.json(images);
});

imagesRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const ImageRepository = getRepository(Image);

    const url = await ImageRepository.find({
      where: { car_id: id },
    });

    const CarRepository = getRepository(Car);

    const car = await CarRepository.findOneOrFail({
      where: { id },
    });

    const info = {
      car,
      url,
    };
    return response.json(info);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

imagesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const imageRepository = getRepository(Image);
    const checkImageExists = await imageRepository.findOne({
      where: { id },
    });

    if (!checkImageExists) {
      throw new Error('Images not found');
    }

    imageRepository.createQueryBuilder()
      .delete()
      .from(Image)
      .where("id = :id", { id: id })
      .execute();

    return response.json();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

imagesRouter.post('/', async (request, response) => {
  const { idCar, url } = request.body;
  const createImage = new CreateImagesService();

  const image = await createImage.execute({
    idCar,
    url,
  });

  return response.json(image);
});

export default imagesRouter;
