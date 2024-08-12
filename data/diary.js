import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';

const diarySchema = new Mongoose.Schema({
    title: {type: String, require: true},
    text: {type: String, require: true},
    userid: {type: String, require: true}
}, {timestamps: true})

useVirtualId(diarySchema);
const Diary = Mongoose.model('Diary', diarySchema);

// 모든 다이어리를 리턴
export async function getAll() {
    return Diary.find().sort({createAt: -1});
}

// 해당 아이디에 대한 다이어리를 리턴
export async function getAllByUserid(userid){
    return Diary.find({userid}).sort({createAt: -1});
}

export async function createDiary({title, text, userid}){
    return new Diary({title, text, userid}).save().then((data) => data.userid)
}

export async function update(id, text){
    return Diary.findByIdAndUpdate(id, {text}, {returnDocument: "after"});
}

export async function remove(id){
    return Diary.findByIdAndDelete(id);
}
