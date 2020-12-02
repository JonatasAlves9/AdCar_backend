import { request, Router } from 'express';
import { getRepository } from 'typeorm';
import Car from '../models/Car';
import CreateCarService from '../services/CreateCarService';
import UpdateCarService from '../services/UpdateCarService';

const carRouter = Router();

carRouter.get('/', async (request, response) => {
  const carRepository = getRepository(Car);

  const { search } = request.query;
  const cars = await carRepository.find();

  const resultsUpper = search
    ? cars.filter(car =>
      car.name.toLowerCase().includes(search.toString().toLowerCase())
    )
    : cars;
  return response.json(resultsUpper);
});

carRouter.get('/', async (request, response) => {
  const carRepository = getRepository(Car);

  const { search } = request.query;
  const cars = await carRepository.find();

  const resultsUpper = search
    ? cars.filter(car =>
      car.name.toLowerCase().includes(search.toString().toLowerCase())
    )
    : cars;
  return response.json(resultsUpper);
});

carRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      brand,
      km,
      year,
      description,
      gearbox,
      price,
      urlMaster,
    } = request.body;

    const updateCar= new UpdateCarService();

    const car = await updateCar.execute({
      id,
      name,
      brand,
      km,
      year,
      description,
      gearbox,
      price,
      url_master: urlMaster,
    });

    return response.json(car);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

});

carRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const carRepository = getRepository(Car);
    const checkCarExists = await carRepository.findOne({
      where: { id },
    });

    if (!checkCarExists) {
      throw new Error('car not found');
    }

    carRepository.createQueryBuilder()
      .delete()
      .from(Car)
      .where("id = :id", { id: id })
      .execute();

    return response.json();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});


carRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      brand,
      km,
      year,
      description,
      gearbox,
      price,
      urlMaster,
    } = request.body;
    const createCar = new CreateCarService();

    const car = await createCar.execute({
      name,
      brand,
      km,
      year,
      description,
      gearbox,
      price,
      url_master: urlMaster,
    });

    return response.json(car);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default carRouter;
