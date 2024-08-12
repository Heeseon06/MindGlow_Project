import express from "express";
import * as noticeController from '../controller/notice.js';

const router = express.Router();

router.get('/notice123', async (req, res, next)=>{
    console.log(req.headers)
    const data = await noticeController.getnotices(req);
    console.log(data)
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({data})
})

router.get('/user', (req, res, next)=>{
    const filePath = path.join(__dirname, "../../5_공지사항.html");
    res.status(200).sendFile(filePath)
});

export default router;