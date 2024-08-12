import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const anxiety_disorderRouter = express.Router();

anxiety_disorderRouter.post('/', (req, res) => {
    const testType = 'anxiety_disorder';
    const answers = req.body;

    const testTypes = req.app.get('testTypes');

    if(!testTypes.includes(testType)) {
        return res.status(400).send({ error: '유효하지 않은 테스트 타입 '})
    }

    if(!answers || typeof answers !== 'object' || Object.keys(answers).length !== 21) {
        return res.status(400).send({ error: '올바른 JSON 데이터를 전송해야 합니다'});
    }

    let totalScore = 0;

    for(const key in answers) {
        const answer = parseInt(answers[key]);

        if(![0, 1, 2, 3].includes(answer)) {
            return res.status(400).send({error: `질문 ${key}의 유효한 답변이 아닙니다`})
        }

        totalScore += answer;
    }
    
    res.cookie('t_title', `불안장애부분 총점: ${totalScore}`);

    if(totalScore < 10) {
        res.cookie('t_result', '불안감은 느낄 수 있으나 일상적인 수준입니다. 마음 건강에 계속 힘써 주세요.');
    }else if (totalScore <20 ) {
        res.cookie('t_result', '일상생활에서 불편함은 느낄 수 있겠으나, 가벼운 수준의 불안입니다. 그래도 어려움을 느끼신다면 전문가의 도움을 받으세요.');
    }
    else if (totalScore <30) {
        res.cookie('t_result', '불안이 심한 수준입니다. 일상생활 유지가 어려울 수 있습니다. 혼자서 이겨내려고 하지 마시고 어서 전문가에게 도움을 요청하십시오.');
    }
    else {
        res.cookie('t_result', '극심한 불안상태일 가능성이 높습니다. 지체하지 마시고 속히 전문가에게 치료를 받으십시오.');
    }

    res.sendFile(path.join(__dirname, "../project/2_result.html"))
});
    

export default anxiety_disorderRouter;