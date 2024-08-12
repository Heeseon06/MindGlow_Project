import * as authRepository from '../data/auth.js';
import * as counselorRepository from '../data/counselor.js';
import * as reserveRepository from '../data/reserve.js';
export async function createReserve(req, res, next) {
    const data1 = await authRepository.findByUserid(req.params.client)
    const data2 = await counselorRepository.findByUserid(req.params.counselor)

    const clientId = data1.userid
    const clientName = data1.name
    const counselorId = data2.userid
    const counselorName = data2.name
    const chatName = clientId+'_'+counselorId
    const active = '비활성화'
    console.log(clientId, counselorName)

    const found = await reserveRepository.findDuplication({clientId, counselorId});
    console.log(found)
    if (found) {
        return res.json('중복')
    }
    const data = await reserveRepository.create({ clientId, clientName, counselorId, counselorName, chatName, active });
    console.log('생성')
    return await res.json('생성')
}

export async function getByClient(req, res, next) {
    const data = await reserveRepository.findByClient(req.params.userid)
    console.log(data)
    return res.json(data)
}
export async function getByCounselor(req, res, next) {
    const data = await reserveRepository.findByCounselor(req.params.userid)
    return res.json(data)
}

export async function updateActive(req, res, next) {
    const {chatName} = req.params
    const active = req.body
    console.log(chatName,active)
    const id = await reserveRepository.findIdByChatName(chatName)

    reserveRepository.updateActive(id,active)
}