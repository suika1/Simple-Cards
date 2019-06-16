import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import UserModel from '../models/user';
import CardModel from '../models/card';

const models = {};

export default new Promise(async res => {
  // create connection
  const {
    DB_USERNAME,
    PASSWORD,
    DATABASE,
    HOST,
    PORT,
  } = process.env;

  const sequelize = new Sequelize(
    DATABASE,
    DB_USERNAME,
    PASSWORD,
    {
      host: HOST,
      port: PORT,
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
  await sequelize.sync()

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
