import { Request, Response, NextFunction} from 'express';
import { verifyAccessToken } from '../../utils/jwt';
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
const token = req.headers['authorization']?.split(' ')[1];
if (!token){
    return
    res.send(403).json({message: 'Access denied'});
}
 try{
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();

 }
 catch(error){
    res.status(401).json({message: 'Inavlid or expired token'})
 }

};