// tweets.js

import express from "express";
import * as diaryController from '../controller/diary.js';
import path, {dirname} from 'path'
import { fileURLToPath } from "url"

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, "../project/일기입력.html"))
});


router.get('/list', async (req, res, next)=>{
    const filePath = path.join(__dirname, "../project/5_일기목록.html");
    res.status(200).sendFile(filePath)
})

router.post('/storage', diaryController.createDiary, async (req, res, next) => {
    res.redirect("./list")
})

router.get('/showList/:userid', diaryController.getDiary )

router.delete('/list/:id', diaryController.deleteDiary)


export default router;