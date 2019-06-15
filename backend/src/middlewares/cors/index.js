const corsMiddleware = (req, res, next) => {
  res.set('Content-Type', 'application/json')
    // cors headers
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};

export default corsMiddleware;
