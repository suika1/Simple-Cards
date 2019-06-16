import express from 'express';

import * as UserController from '../../controllers/user';
import middlewares from '../../middlewares';

const router = express.Router();

router.post('/', UserController.createUser);

router.post('/validate/', UserController.validateUser);
router.post('/validate-by-token/', middlewares.checkToken, UserController.validateByToken);

export default router;
