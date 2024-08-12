import * as diaryRepository from '../data/diary.js';

export async function createDiary(req, res, next) {
    const { title, text, userid } = req.body;
    console.log(title,text, userid)
    const data = diaryRepository.createDiary({ title, text, userid })
    next()
}


export async function getDiary(req,res,next){
    const userid = req.params.userid
    const datas = await diaryRepository.getAllByUserid(userid)
    console.log(datas)
    res.json(datas);
}

// 트윗을 변경하는 함수
export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if(tweet){
        res.status(201).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}

// 트윗을 삭제하는 함수
export async function deleteDiary(req, res, next) {
    const id = req.params.id;
    await diaryRepository.remove(id);
    res.sendStatus(204);
}

