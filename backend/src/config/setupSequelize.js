import Sequelize from 'sequelize';
import { username, password, host, port, database } from './dbConfig';

import UserModel from '../models/user';
import CardModel from '../models/card';

const models = {};

export default new Promise(async res => {
  // create connection
  const sequelize = new Sequelize(
    database,
    username,
    password,
    {
      host,
      port,
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  // initialize models
  const User = UserModel(sequelize, Sequelize);
  const Card = CardModel(sequelize, Sequelize);

  User.hasMany(Card);

  // sync db and models
  await sequelize.sync({ force: true })

  // test connection
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }

  models.User = User;
  models.Card = Card;
  res();
});

export const getModels = () => models;
