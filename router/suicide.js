import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const suicideRouter = express.Router();

suicideRouter.post('/', (req, res) => {
    const testType = 'suicide';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if(!testTypes.includes(testType)) {
        return res.status(400).send({error: '유효하지 않은 테스트 타입'})
    }

    if(!answers || typeof answers !== 'object' || Object.keys(answers).length !== 19) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다'});
    }

    let totalScore = 0;

    for(const key in answers) {
        const answer = parseInt(answers[key]);

        if(![0, 1, 2].includes(answer)) {
            return res.status(400).send({ error: `질문 ${key}의 유효한 답변이 아닙니다`})
        }

        totalScore += answer;
    }

    res.cookie('t_title', `자살부분 총점: ${totalScore}`);

        if (totalScore <= 13) {
            res.cookie('t_result', '일반적인 수준입니다. 정상적인 상태라고 볼 수 있습니다.');
        }
        else if (totalScore <= 17) {
            res.cookie('t_result', '자살 생각을 많이 하는 것 같습니다. 무엇 때문인지 혼자 힘으로 해결이 어렵다면 전문가에게 도움을 요청할 수 있습니다.');
        }
        else if (totalScore <= 21) {
            res.cookie('t_result', '자살 생각을 상당히 많이 하고 있습니다. 일상생활의 어려움도 충분히 예견됩니다. 전문가에게 도움을 요청하십시오.');
        }
        else {
            res.cookie('t_result', '자살생각을 매우 많이 하고 있습니다. 무엇을 망설이시나요, 미루지 마시고 속히 전문가에게 치료를 받으십시오.');
        }

        res.sendFile(path.join(__dirname, "../project/2_result.html"))
})

export default suicideRouter;