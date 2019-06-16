import jwt from 'jsonwebtoken';
import tokenSecret from '../../config/token-secret';
import * as utils from '../../utils';

const checkToken = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token && token.length && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        return utils.generateResponse({
          res,
          status: 401,
          ok: false,
          error: 'Token is not valid',
        });
      }

      req.decoded = decoded;
      next();
    });
  } else {
    return utils.generateResponse({
      res,
      status: 400,
      ok: false,
      error: 'Auth token is not supplied',
    });
  }
};

export default checkToken;
