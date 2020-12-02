/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import Admin from '../models/Admin';

interface Request {
  name: string;
  email: string;
  password: string;
}

class createAdminService {
  public async execute({
    name,
    email,
    password,
  }: Request): Promise<Admin> {
    const adminRepository = getRepository(Admin);

    const admin = adminRepository.create({
      name,
      email,
      password,
    });

    await adminRepository.save(admin);

    return admin;
  }
}

export default createAdminService;
