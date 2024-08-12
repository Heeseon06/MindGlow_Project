import * as tweetRepository from '../data/tweet.js';
// 여러 트윗을 가져오는 함수
export async function getTweets(req, res){
    const username = req.query.username;
    const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
    res.status(200).json(data);
}

// 하나의 트윗을 가져오는 함수
export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}
// 트윗을 생성하는 함수
export async function createTweet(req, res, next) {
    const { text } = req.body;
    console.log(req.body)
    const tweet = await tweetRepository.create(text, req.body.userid);
    res.status(201).json(tweet);
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
export async function deleteTweet(req, res, next) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}