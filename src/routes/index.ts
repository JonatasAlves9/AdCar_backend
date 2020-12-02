import express, { Router } from 'express';

import userRouter from './user.routes';
import sellerRouter from './seller.routes';
import carRouter from './car.routes';
import imagesRouter from './images.routes';
import adminRouter from './admin.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Word' })
);
// middleware
routes.use(express.json());
routes.use(express.urlencoded());

routes.use('/images', imagesRouter);
routes.use('/cars', carRouter);
routes.use('/users', userRouter);
routes.use('/sellers', sellerRouter);
routes.use('/admins', adminRouter);

export default routes;