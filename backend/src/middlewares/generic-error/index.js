import { generateResponse } from '../../utils';

// Log errors && Return respond with error
const genericErrorMiddleware = (err, req, res, next) => {
  if (!err) return next(err);

  console.warn('--------------- Error ---------------');
  console.error(err.message);
  console.warn('--------------------------------------');

  return generateResponse({
    res,
    status: 500,
    results: '',
    ok: false,
    error: {
      message: err.message,
    },
  });
};

export default genericErrorMiddleware;
