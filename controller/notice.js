import * as noticeRepository from '../data/notice.js';
export async function getnotices(req){
    const username = req.query.username;
    const data = await noticeRepository.getAll()
    return data
}