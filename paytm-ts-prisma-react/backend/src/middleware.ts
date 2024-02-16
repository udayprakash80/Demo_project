import jwt from 'jsonwebtoken';
export const AuthMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(403).json({});
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'udaya');
    const userId = (decoded as any).userId
    if(userId){
      req.body = {...req.body, userId: userId};
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
}
