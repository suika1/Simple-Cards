import express from 'express';
const app = express();

import * as urls from './config/urls';

import cardRoutes from './routes/api/card';
import userRoutes from './routes/api/user';

import middlewares from './middlewares';
import setupSequelize from './config/setupSequelize';

(async () => {
  await setupSequelize;
  console.log('---\nSequelize setup ended');

  // parse application/x-www-form-urlencoded && application/json
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use(middlewares.cors);
  
  // Delegate path to router
  app.use(urls.cards, middlewares.checkToken, cardRoutes);
  app.use(urls.users, userRoutes);
  
  app.use(middlewares.genericError);
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`---\nServer is listening on port ${PORT}.`));  
})();
