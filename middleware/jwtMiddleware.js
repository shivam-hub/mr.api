const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = jwtMiddleware;
