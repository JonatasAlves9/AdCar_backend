/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Car from '../models/Car';

interface Request {
  name: string;
  brand: string;
  km: string;
  year: string;
  description: string;
  gearbox: string;
  price: string;
  url_master: string;
}

class createCarService {
  public async execute({
    name,
    brand,
    km,
    year,
    description,
    gearbox,
    price,
    url_master,
  }: Request): Promise<Car> {
    const carRepository = getRepository(Car);

    const car = carRepository.create({
      name,
      brand,
      km,
      year,
      description,
      gearbox,
      price,
      url_master,
    });

    await carRepository.save(car);

    return car;
  }
}

export default createCarService;
