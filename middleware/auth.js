import jwt from 'jsonwebtoken'
import * as authRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = {message: '인증에러'}
const secret = config.jwt.secretKey;

export const isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization')

    // if (!(authHeader && authHeader.startsWith('Bearer '))){
    //     console.log('에러1')
    //     return res.status(401).json(AUTH_ERROR);
    // }
    if (!authHeader) {
        return res.status(401).json({ message: '인증 헤더가 없습니다.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
    }
    
    jwt.verify(token, secret, async (error, decoded) => {
        if (error) {
            console.log('에러2');
            return res.status(402).json(AUTH_ERROR);
        }
        const user = await authRepository.findById(decoded.id);
        if (!user) {
            console.log('에러3');
            return res.status(403).json(AUTH_ERROR);
        }
        req.body.userid = user.id;
        next();
    });
}