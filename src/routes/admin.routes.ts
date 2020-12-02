import { Router } from 'express';
import { getRepository } from 'typeorm';
import Admin from '../models/Admin';
import CreateAdminService from '../services/CreateAdminService';

const adminsRouter = Router();


adminsRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createAdmin = new CreateAdminService();

    const admin = await createAdmin.execute({
      name,
      email,
      password
    });

    return response.json(admin);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

adminsRouter.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    const repositoryAdmin = getRepository(Admin);

    const checkAdminExists = await repositoryAdmin.findOne({
      where: { email, password },
    });


    if (!checkAdminExists) {
      return response.status(400).json({ error: "user not exist" });
    }

    return response.json(checkAdminExists)

  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default adminsRouter;
