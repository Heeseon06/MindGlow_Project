import jwt from 'jsonwebtoken'
import * as counselorRepository from '../data/counselor.js';

const AUTH_ERROR = {message: '인증에러'}

export const isCounselor = async(req, res, next) => {
    const authHeader = req.get('Authorization')
    // console.log(authHeader)

    if (!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('에러1')
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'abcd1234%^&', async (error, decoded) => {
        if (error) {
            console.log('에러2');
            return res.status(402).json(AUTH_ERROR);
        }
        const user = await counselorRepository.findById(decoded.id);
        if (!user) {
            console.log('에러3');
            return res.status(403).json(AUTH_ERROR);
        }
        req.body.userid = user.id;
        next();
    });
}