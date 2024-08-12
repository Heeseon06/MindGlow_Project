import * as counselorRepository from '../data/counselor.js';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from '../config.js'


const secret = config.jwt.secretKey
const jwtExpiresInDays = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;
let token = ''

function createJwtToken(id) {
    return jwt.sign({ id }, secret, { expiresIn: jwtExpiresInDays })
}


export async function signup(req, res, next) {
    let { userid, userpw, name, hp, email, ssn1, ssn2, zipcode, address1, address2, address3  } = req.body;
    const found = await counselorRepository.findByUserid(userid);
    if (found) {
        return res.status(409).json({ message: `${userid}은 이미 존재합니다.` })
    }
    userpw = await bcrypt.hash(userpw, bcryptSaltRounds);
    const userId = await counselorRepository.createUser({userid, userpw, name, hp, email, ssn1, ssn2, zipcode, address1, address2, address3 });
    const token = createJwtToken(userId);
    next()
}

export async function login(req, res, next) {
    const { userid, userpw } = req.body;
    const user = await counselorRepository.findByUserid(userid);
    if(!user){
        return res.status(404).redirect('/client')
    }
    const isValiduserpw = bcrypt.compareSync(userpw, user.userpw)
    if(!isValiduserpw){
        return res.status(404).redirect('/client')
    }
    const id = user.id
    token = createJwtToken(id)
    // Userid = userid
    // console.log(`${token}\n${Userid}\n${id}`)
    // return next()

    // JWT를 쿠키에 설정
    res.cookie('token', token);
    res.cookie('userid', userid);
    res.cookie('center', 'exist')
    // res.cookie('userid', userid, { httpOnly: true, secure: true, maxAge: jwtExpiresInDays * 1000 });
    // 홈 페이지로 리다이렉션
    res.redirect('./login');
}

export async function info(req, res, next) {
    const id = req.params.id;
    const user = await counselorRepository.findById(id)
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: `${id}의 유저가 없습니다`})
    }
}

export async function me(req, res, next){
    const userid = req.params.userid
    console.log(req.params)
    const { userpw } = req.body;
    const user = await counselorRepository.findByUserid(userid);
    console.log(user)
    const isValiduserpw = bcrypt.compareSync(userpw, user.userpw)
    if(!isValiduserpw){
        res.redirect('/path/5/1')
    }
    next()
}