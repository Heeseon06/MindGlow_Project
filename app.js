import express from 'express'
import morgan from 'morgan'
import authRouter from './router/auth.js'
import counselorRouter from './router/counselor.js'
import { config } from './config.js'
import { connectDB } from './db/database.js'
import bodyParser from 'body-parser';
import pathRouter from './router/path.js'
import diaryRouter from './router/diaries.js';
import reserveRouter from './router/reserve.js';
import noticeRouter from './router/notice.js';
import jsonRouter from './router/json.js';
import cors from 'cors';

const app = express()


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.use("/project_img", express.static("./project_img"));
app.use('/CenterDB', express.static('./CenterDB'))

app.use('/client', authRouter)
app.use('/counselor', counselorRouter)
app.use('/path', pathRouter)
app.use('/diaries', diaryRouter);
app.use('/management', reserveRouter)
app.use('/notices', noticeRouter)
app.use('/json', jsonRouter)

// app.use((err, req, res, next) => {
//     res.sendStatus(404)
// })

// -------------------------심리테스트---------------------------
import depressionRouter from './router/depression.js';
import suicideRouter from './router/suicide.js';
import stressRouter from './router/stress.js';
import social_anxiety_disorderRouter from './router/social_anxiety_disorder.js';
import anxiety_disorderRouter from './router/anxiety_disorder.js';
import panic_disorderRouter from './router/panic_disorder.js';
import ADHDRouter from './router/ADHD.js';

app.set('testTypes', ['depression', 'suicide', 'stress', 'social_anxiety_disorder', 'anxiety_disorder', 'panic_disorder', 'ADHD'])

app.use(express.json());

const routers = {
    "depression": depressionRouter,
    "suicide": suicideRouter,
    "stress": stressRouter,
    "social_anxiety_disorder": social_anxiety_disorderRouter,
    "anxiety_disorder": anxiety_disorderRouter,
    "panic_disorder": panic_disorderRouter,
    "ADHD": ADHDRouter
}

for (const [testType, router] of Object.entries(routers)) {
    app.use(`/test/${testType}`, router);
}


import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import WebSocket from 'ws'
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 고객들의 웹 소켓 연결을 저장할 맵
// const clientSockets = new Map();

// Socket.io 라우팅 설정
app.use('/socket.io', express.static('node_modules/socket.io/client-dist'));

// 클라이언트 연결 시 이벤트 리스너
io.on('connection', (socket) => {
    console.log('a user connected');

    // 클라이언트에서 메시지를 받음
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // 메시지를 모든 클라이언트에게 보냄
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// DB 연결 테스트!
connectDB().then((db) => {
    console.log('몽구스 사용하여 몽고디비 접속 성공')
    server.listen(config.host.port, () => {
        console.log(`서버가 포트 ${config.host.port}에서 실행 중입니다.`);
    });
}).catch(console.error);

