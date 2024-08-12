import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const stressRouter = express.Router();

stressRouter.post('/', (req, res) => {
    const testType = 'stress';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if (!testTypes.includes(testType)) {
        return res.status(400).send({ error: '유효하지 않은 테스트 타입' });
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length != 30) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다.' });
    }

    let totalScore = 0;

    for (const key in answers) {
        const answer = parseInt(answers[key]);

        if (![0, 1].includes(answer)) {
            return res.status(400).send({ error: `질문 ${key}의 유효한 답변이 아닙니다` })
        }

        totalScore += answer;
    }

    res.cookie('t_title', `스트레스부분 총점: ${totalScore}`);

        if (totalScore <= 5) {
            res.cookie('t_result', '현재는 스트레스 상황에 잘 대처하고 계십니다.');
        }
        else if (totalScore <= 10) {
            res.cookie('t_result', '여러 가지 스트레스를 오랫동안 받아오신 것 같습니다. 장기간 지속되는 스트레스');
        }
        else {
            res.cookie('t_result', '과도한 스트레스에 시달려 현재 위험한 상태인 것 같습니다. 더 이상 혼자 힘으로 이겨내려고 하거나 방치하지 마시고 속히 전문가에게 치료를 받으십시오.');
        }

        res.sendFile(path.join(__dirname, "../project/2_result.html"))
});

export default stressRouter;