import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const depressionRouter = express.Router();

depressionRouter.post('/', (req, res) => {
    const testType = 'depression';    
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if(!testTypes.includes(testType)) {
        return res.status(400).send({error: '유효하지 않은 테스트 타입'})
    }

    if(!answers || typeof answers !== 'object' || Object.keys(answers).length !== 20) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다'});
    }

    let totalScore = 0;

    for(const key in answers) {
        const answer = parseInt(answers[key]);

        if (![1, 2, 3, 4].includes(answer)) {
            return res.status(400).send({error: `질문 ${key}의 유효한 답변이 아닙니다`})
        }

        totalScore += answer;
    }

    res.cookie('t_title', `우울증부분 총점: ${totalScore}`);

    if(totalScore <= 40) {
        res.cookie('t_result', '다행히 지금 상태는 우을증은 아니십니다. 계속 마음건강에 힘써 주세요.');
    }else if (totalScore <= 50 ) {
        res.cookie('t_result', '경증의 우울상태라 볼 수 있습니다. 힘들다고 느끼신다면 조기에 전문적인 도움을 받아보세요.');
    }else if (totalScore <= 60 ) {
        res.cookie('t_result', '상당한 정도의 우울상태에 있습니다. 지금 같은 상태가 한 달 이상 지속되었다면 가급적 빨리 전문가에게 도움을 요청하십시오.');
    }
    else {
        res.cookie('t_result', '중증 우울상태에 있습니다. 우울함은 의지로 이겨낼 수 있는 증상이 아닙니다. 속히 전문가에게 치료를 받으십시오.');
    }

    res.sendFile(path.join(__dirname, "../project/2_result.html"))
});
export default depressionRouter;
    