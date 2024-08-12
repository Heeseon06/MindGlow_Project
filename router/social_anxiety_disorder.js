import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const social_anxiety_disorderRouter = express.Router();

social_anxiety_disorderRouter.post('/', (req, res) => {
    const testType = 'social_anxiety_disorder';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if(!testTypes.includes(testType)) {
        return res.status(400).send({ error: '유효하지 않은 테스트 타입'})
    }

    if(!answers || typeof answers !== 'object' || Object.keys(answers).length !== 20) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다'})
    }

    let totalScore = 0;

    for(const key in answers) {
        const answer = parseInt(answers[key]);

        if(![1, 2, 3, 4, 5].includes(answer)) {
            return res.status(400).send({ error: `질문 ${key}의 유효한 답변이 아닙니다`})
        }

        totalScore += answer;
    }

    res.cookie('t_title', `대인불안증부분 총점: ${totalScore}`);

    if(totalScore <= 27) {
        res.cookie('t_result', '대인관계에서 별다른 문제는 없어 보입니다.');
    }else if (totalScore <= 45 ) {
        res.cookie('t_result', '대인관계에서 어느 정도 불편함을 느낄 수 있습니다. 개선을 원하신다면 전문가의 도움을 받아보세요.');
    }
    else {
        res.cookie('t_result', '대인관계에서 여러 가지 어려움을 느끼고 계십니다. 대인관계의 문제는 여러 가지 심리적 문제로 이어질 수 있으니 가급적이면 빨리 전문가에게 도움을 요청하십시오.');
    }

    res.sendFile(path.join(__dirname, "../project/2_result.html"))
});

export default social_anxiety_disorderRouter;