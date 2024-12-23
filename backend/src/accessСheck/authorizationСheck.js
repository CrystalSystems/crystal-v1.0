import jwt from 'jsonwebtoken';
export default (req, res, next) => {
  const token = (req.cookies?.token)?.replace(/Bearer\s?/, '');
  // JWT token secret key
  const jwtTokenSecretKey = process.env.JWT_TOKEN_SECRET_KEY;
  // /JWT token secret key
  try {
    const decoded = jwt.verify(token, jwtTokenSecretKey);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
