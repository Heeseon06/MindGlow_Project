import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

// Notice Schema
const noticeSchema = new Mongoose.Schema({
    content: { type: String, required: true },
}, {timestamps: true});
useVirtualId(noticeSchema);
// 생성
const Notice = Mongoose.model('Notice', noticeSchema);
// 모든 트윗을 리턴
export async function getAll() {
    return Notice.find().sort({createAt: -1});
}