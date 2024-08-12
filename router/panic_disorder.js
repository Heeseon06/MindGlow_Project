import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const panic_disorderRouter = express.Router();

panic_disorderRouter.post('/', (req, res) => {
    const testType = 'panic_disorder';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if(!testTypes.includes(testType)) {
        return res.status(400).send({error: '유효하지 않은 테스트 타입'})
    }

    if(!answers || typeof answers !== 'object' || Object.keys(answers).length !== 13) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다'});
    }

    let totalScore = 0;
    let countYes1To11 = 0;
    let countNo1To11 = 0;
    let countYes12To13 = 0;
    let countNo12To13 = 0;

    for(const key in answers) {
        const answer = parseInt(answers[key]);

        if(![1, 0].includes(answer)) {
            return res.status(400).send({ error: `질문 ${key}의 유효한 답변이 아닙니다`})
        }

        totalScore += answer;

        if (answer === 1) {
            if (key <= 11) {
                countYes1To11++;
            } else if (key == 12 || key == 13) {
                countYes12To13++;
            }
        } else if (answer === 0) {
            if (key <= 11) {
                countNo1To11++;
            }else if (key == 12 || key == 13) {
                countYes12To13++;
            }
        }
    }

    res.cookie('t_title', `공황장애부분 총점: ${totalScore}`);

    if(countYes1To11 >= 3 && countYes12To13 >= 1) {
        res.cookie('t_result','공황을 경험하셨다고 볼 수 있습니다. 그렇다고 해서 공황장애를 겪고 있다고는 볼 수 없으니 정확한 진단을 얻고 싶으시다면 전문가의 도움을 요청하세요.');
    }
    else {
        res.cookie('t_result', '이상 없습니다.');
    }

    res.sendFile(path.join(__dirname, "../project/2_result.html"))
});

export default panic_disorderRouter;