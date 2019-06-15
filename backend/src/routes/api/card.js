import express from 'express';

import * as CardController from '../../controllers/card';

const router = express.Router();

router.post('/', CardController.createCard);
router.get('/', CardController.getAllCards);
router.put('/:id', CardController.updateCard);
router.delete('/:id', CardController.deleteCard);

export default router;
