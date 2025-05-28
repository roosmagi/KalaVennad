const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/SECRET');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Token puudub' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Kehtetu token' });
    req.user = user;
    next();
  });
};
