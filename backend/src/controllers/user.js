import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as utils from '../utils';
import { getModels } from '../config/setupSequelize';

const tokenSecret = process.env.TOKEN_SECRET;

export const createUser = async (req, res, next) => {
  try {
    const { User } = getModels();
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) return utils.generateResponse({
      res,
      status: 400,
      ok: false,
      error: 'Bad arguments',
    });

    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegexp.test(email)) return utils.generateResponse({
      res,
      status: 400,
      ok: false,
      error: 'Bad email',
    });

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
        error: 'User already exists',
      });
    }

    const saltRounds = Math.ceil(Math.random() * 10);
    const hash = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign(
      { email, hash },
      tokenSecret,
      { expiresIn: '24h' },
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

    if (!email || !password) return utils.generateResponse({
      res,
      status: 400,
      error: 'Bad arguments',
    });

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
      { email, hash: foundUser.hash },
      tokenSecret,
      { expiresIn: '24h' },
    );

    return utils.generateResponse({
      res,
      token,
      results: foundUser,
    });
  } catch (err) {
    next(err);
  }
}

export const validateByToken = async (req, res, next) => {
  try {
    const { User } = getModels();
    const {
      email,
      hash,
    } = req.decoded;

    const foundUser = await User.findOne({
      where: {
        email,
        hash,
      },
    });

    if (!foundUser) return utils.generateResponse({
      res,
      status: 401,
      error: 'User not found',
    });

    const token = jwt.sign(
      { email, hash },
      tokenSecret,
      { expiresIn: '24h' },
    );

    return utils.generateResponse({
      res,
      results: foundUser,
      token,
    });
  } catch (err) {
    next(err);
  }
}
