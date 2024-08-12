import * as pathRepository from '../data/path.js';
import * as counselorRepository from '../data/counselor.js';
import { config } from '../config.js'

export async function info(req, res, next) {
    const centerName = req.params.centerName;
    console.log('param',centerName)
    let { oldAddress, newAddress } = await pathRepository.findByCenterName(centerName)
    console.log('result', oldAddress, newAddress)

    if (oldAddress) {
        const parts = oldAddress.split(' ');
        if (!parts[0].includes('서울')) {
            parts.shift();
        }
        parts[0] = '서울'
        const index = parts.findIndex(part => part.includes('동'));
        oldAddress = parts.slice(0, index + 1).join(' ');
        console.log(oldAddress);
    }

    if (newAddress) {
        const parts2 = newAddress.split(' ');
        if (!parts2[0].includes('서울')) {
            parts2.shift();
        }
        parts2[0] = '서울'
        newAddress = parts2.slice(0, 3).join(' ');
        console.log(newAddress);
    }

    const user = await counselorRepository.findByAddress(oldAddress, newAddress)
    console.log(user)

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: `유저가 없습니다` })
    }
}