import { getRepository, getConnection } from 'typeorm';

import Seller from '../models/Seller';

interface Request {
  id: string;
  name: string;
  cellphone: string;
  email: string;
}

class UpdateSellerService {
  public async execute({
    id,
    name,
    cellphone,
    email
  }: Request): Promise<Seller> {
    const sellerRepository = getRepository(Seller);

    await getConnection()
      .createQueryBuilder()
      .update(Seller)
      .set({
        id,
        name,
        cellphone,
        email
      })
      .where('id = :id', { id })
      .execute();

    const seller = await sellerRepository.findOneOrFail({
      where: [{ id }],
    });

    return seller;
  }
}

export default UpdateSellerService;