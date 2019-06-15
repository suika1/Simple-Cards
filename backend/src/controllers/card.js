import * as utils from '../utils';
import { getModels } from '../config/setupSequelize';

export const createCard = async (req, res, next) => {
  try {
    const { Card, User } = getModels();
    const {
      title,
      text,
    } = req.body;
    const {
      email,
    } = req.decoded;
    if (!title || !text) return utils.generateResponse({
      res,
      status: 400,
      error: 'Bad arguments',
    });

    const { id: userId } = await User.findOne({
      where: {
        email,
      },
    });

    const createdCard = await Card.create({
      title,
      text,
      userId,
    });

    return utils.generateResponse({
      res,
      results: createdCard,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCards = async (req, res, next) => {
  try {
    const { Card } = getModels();

    const cards = await Card.findAll();

    return utils.generateResponse({
      res,
      results: cards,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const { Card } = getModels();
    const { id } = req.params;
    const updateProps = req.body;

    if (!updateProps) return utils.generateResponse({
      res,
      status: 400,
      error: 'Bad arguments',
    });

    const foundCard = await Card.findByPk(id);

    if (!foundCard) return utils.generateResponse({
      res,
      status: 400,
      error: `Card with id ${id} not found`,
    });

    const newCard = await foundCard.update(updateProps);

    return utils.generateResponse({
      res,
      results: newCard,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const { Card } = getModels();
    const { id } = req.params;

    const foundCard = await Card.findByPk(id);

    if (!foundCard) return utils.generateResponse({
      res,
      status: 400,
      error: `Card with id ${id} not found`,
    });

    await foundCard.destroy();

    return utils.generateResponse({
      res,
    });
  } catch (err) {
    next(err);
  }
};
