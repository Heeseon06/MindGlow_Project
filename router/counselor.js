import express from 'express';
import { body } from 'express-validator';
import * as counselorController from '../controller/counselor.js';
import { validate } from '../middleware/validator.js';
import { isCounselor } from '../middleware/counselor.js'
import path, {dirname} from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const validateLogin = [
    body('userid').trim().notEmpty().withMessage('userid 입력'),
    body('userpw').trim().isLength({ min: 4 }).withMessage('userpw는 최소 4자 이상 입력'), validate
]

const validateSignup = [
    ...validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력'),
    body('email')
        .if(body('email').exists())
        .trim().isEmail().withMessage('유효한 이메일을 입력하세요'),
    body('ssn1').notEmpty().withMessage('주민앞자리 확인'),
    body('ssn2').notEmpty().withMessage('주민앞자리 확인'),
    body('zipcode').notEmpty().withMessage('우편번호 확인'),
    body('address1').notEmpty().withMessage('우편번호 확인'),
    validate
]

router.post('/signup', validateSignup, counselorController.signup, (req, res, next) => {
    res.send(`
        <script>
            window.location.href = "../client";
        </script>
    `);
});
router.post('/login', validateLogin, counselorController.login);
router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../project/1_홈.html"))
});

router.post('/update/:userid',(req,res,next)=>{
    res.redirect("/path/5")
})

// router.get('/:id', isCounselor, counselorController.info)

export default router;