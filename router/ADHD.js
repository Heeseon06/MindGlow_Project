import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ADHDRouter = express.Router();

ADHDRouter.post('/', (req, res) => {
    const testType = 'ADHD';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if (!testTypes.includes(testType)) {
        return res.status(400).send({ error: '유효하지 않은 테스트 타입' })
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length !== 10) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다' });
    }

    let totalScore = 0;

    for (const key in answers) {
        const answer = parseInt(answers[key]);

        if (![0, 1, 2, 3].includes(answer)) {
            return res.status(400).send({ error: `질문 ${key}의 유효한 답변이 아닙니다` })
        }

        totalScore += answer;
    }

    res.cookie('t_title', `ADHD부분 총점: ${totalScore}`);

    if(totalScore <= 15) {
        res.cookie('t_result', '안심하셔도 됩니다. 현재는 건강한 상태입니다.');
    }else if (totalScore <= 25 ) {
        res.cookie('t_result', '과잉행동장애를 생각해 볼 수 있습니다. 정확한 진단은 전문가의 도움을 받으세요.');
    }
    else {
        res.cookie('t_result', '과잉행동장애라고 볼 수 있는 가능성은 매우 높습니다. 조기 개입이 필요하니 전문가의 도움을 받으시기 바랍니다.');
    }

    res.sendFile(path.join(__dirname, "../project/2_result.html"))
});

export default ADHDRouter;