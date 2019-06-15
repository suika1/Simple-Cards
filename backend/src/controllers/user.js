import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as utils from '../utils';
import { getModels } from '../config/setupSequelize';

import tokenSecret from '../config/token-secret';

export const createUser = async (req, res, next) => {
  try {
    const { User } = getModels();
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) throw new Error('Bad arguments');

    // check if exists
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });

    if (foundUser) {
      return utils.generateResponse({
        res,
        status: 400,
        ok: false,
        error: 'user already exists',
      });
    }

    const saltRounds = Math.ceil(Math.random() * 10);
    const hash = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' }, // expires in 24 hours
    );
    const createdUser = await User.create({
      email,
      hash,
    });

    return utils.generateResponse({ res, results: createdUser, token });
  } catch (err) {
    next(err);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const { User } = getModels();
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) throw new Error('Bad arguments');

    const foundUser = await User.findOne({
      where: {
        email
      }
    });
    if (!foundUser) return utils.generateResponse({
      res,
      status: 400,
      error: 'User not found',
    });

    // compare real password hash with received password
    const result = await bcrypt.compare(password, foundUser.hash);
    if (!result) return utils.generateResponse({
      res,
      status: 400,
      error: 'Wrong password',
    });

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' }, // expires in 24 hours
    );

    return utils.generateResponse({
      res,
      token,
    });
  } catch (err) {
    next(err);
  }
}