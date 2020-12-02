import { getRepository, getConnection } from 'typeorm';

import Car from '../models/Car';

interface Request {
  id: string;
  name: string;
  brand: string;
  km: string;
  year: string;
  description: string;
  gearbox: string;
  price: string;
  url_master: string;
}

class UpdateCarService {
  public async execute({
    id,
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

    await getConnection()
      .createQueryBuilder()
      .update(Car)
      .set({
        id,
        name,
        brand,
        km,
        year,
        description,
        gearbox,
        price,
        url_master,
      })
      .where('id = :id', { id })
      .execute();

    const car = await carRepository.findOneOrFail({
      where: [{ id }],
    });

    return car;
  }
}

export default UpdateCarService;