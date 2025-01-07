import jwt from 'jsonwebtoken';
export default (req, res, next) => {
  const token = (req.cookies?.token)?.replace(/Bearer\s?/, '');
  // JWT secret key
  const JWTSecretKey = process.env.JWT_SECRET_KEY;
  // /JWT secret key
  try {
    const decoded = jwt.verify(token, JWTSecretKey);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
