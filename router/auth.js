import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js'
import path, {dirname} from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const validateLogin = [
    body('userid').trim().notEmpty().withMessage('userid 입력'),
    body('userpw').trim().notEmpty().withMessage('userpw는 최소 4자 이상 입력'), validate
]

const validateSignup = [
    ...validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력'),
    body('email')
        .if(body('email').exists())
        .trim().isEmail().withMessage('유효한 이메일을 입력하세요'),
    body('ssn1').notEmpty().withMessage('주민앞자리 확인'),
    body('ssn2').notEmpty().withMessage('주민앞자리 확인'),
    validate
]

router.get('/', (req,res,next) =>{
    res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: true });
    res.cookie('userid', '', { maxAge: 0, httpOnly: true, secure: true });
    res.cookie('centerName', '', { maxAge: 0, httpOnly: true, secure: true });
    res.cookie('center', '', { maxAge: 0, httpOnly: true, secure: true });
    res.sendFile(path.join(__dirname, "../project/0_로그인.html"))
})
router.get('/signup', (req,res,next) =>{
    res.sendFile(path.join(__dirname, "../project/0_회원가입.html"))
})

router.post('/signup', validateLogin, authController.signup, (req, res, next) => {
    console.log(path.join(__dirname, "../project/0_로그인.html"))
    res.send(`
        <script>
            window.location.href = "./";
        </script>
    `);
});

router.post('/login', validateLogin, authController.login);
router.get('/login', (req, res, next) => {
    console.log(path.join(__dirname, "../project/1_홈.html"))
    res.sendFile(path.join(__dirname, "../project/1_홈.html"))
});

router.post('/update/:userid',(req,res,next)=>{
    res.redirect("/path/5")
})

router.get('/:userid', authController.info)

export default router;