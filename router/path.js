import express from 'express';
import path, {dirname} from 'path'
import { fileURLToPath } from "url";
import * as pathController from '../controller/path.js'
import * as authController from '../controller/auth.js';
import * as counselorController from '../controller/counselor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

router.get('/alarm', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_알람.html"))
})
router.get('/introduce', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_서비스소개.html"))
})

router.get('/1', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_홈.html"))
})
router.get('/1/1', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/0_준비중.html"))
})
router.get('/1/2', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_명상음악.html"))
})
router.get('/1/3', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_추천책.html"))
})

router.get('/2', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_2_자가진단.html"))
})
router.get('/2/1', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_우울증.html"))
})
router.get('/2/2', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_공황장애.html"))
})
router.get('/2/3', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_스트레스.html"))
})
router.get('/2/4', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_ADHD.html"))
})
router.get('/2/5', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_대인불안증.html"))
})
router.get('/2/6', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_불안장애.html"))
})
router.get('/2/7', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/2_자살생각척도.html"))
})

router.get('/3', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_3_map.html"))
})

router.get('/3/1/:centerName', pathController.info)
router.get('/3/:centerName' ,(req,res,next) =>{
    const centerName = req.params.centerName;

    res.cookie('centerName',centerName)
    res.sendFile(path.join(__dirname, "../project/3_상담사선택.html"))
})

router.get('/4', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_4_상담관리.html"))
})
router.get('/4/:chatName',(req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/3_채팅.html"))
})

router.get('/5', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/1_5_마이페이지.html"))
})
router.get('/5/1', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/5_회원정보변경.html"))
})
router.post('/client/:userid', authController.me ,(req,res,next)=>{
    console.log('good')
    
    res.sendFile(path.join(__dirname, "../project/5_정보수정.html"))
})
router.post('/counselor/:userid', counselorController.me ,(req,res,next)=>{
    console.log('good')
    
    res.sendFile(path.join(__dirname, "../project/5_정보수정.html"))
})

router.get('/5/2', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/5_예약현황.html"))
})
router.get('/5/3', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/5_일기목록.html"))
})
router.get('/5/4', (req,res,next) => {
    res.sendFile(path.join(__dirname, "../project/5_공지사항.html"))
})

export default router;