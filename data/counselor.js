import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'

// const clientSchema = new Mongoose.Schema({
//     userid: {type: String, require: true},
//     userpw: {type: String, require: true},
//     name: {type: String, require: true},
//     hp: {type: String, require: true},
//     email: String,
//     ssn1: {type: Number, require: true},
//     ssn2: {type: Number, require: true}
// })
// useVirtualId(clientSchema);
// const Client = Mongoose.model('Client', clientSchema);

const counselorSchema = new Mongoose.Schema({
    userid: { type: String, require: true },
    userpw: { type: String, require: true },
    name: { type: String, require: true },
    hp: { type: String, require: true },
    email: String,
    ssn1: { type: Number, require: true },
    ssn2: { type: Number, require: true },
    zipcode: { type: String, require: true },
    address1: { type: String, require: true },
    address2: { type: String },
    address3: { type: String, require: true }
})
useVirtualId(counselorSchema);
const Counselor = Mongoose.model('Counselor', counselorSchema);

// 아이디 중복검사
export async function findByUserid(userid) {
    return Counselor.findOne({ userid });  // 내장함수
}

// id 중복검사
export async function findById(id) {
    return Counselor.findById(id);  // 내장함수
}

export async function createUser(user) {
    return new Counselor(user).save().then((data) => data.id)
}

function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user;
}

export async function findByAddress(oldAddress, newAddress) {
    const list = []
    if (oldAddress != '') {
        const data = await Counselor.find({ address1: { $regex: oldAddress } });
        if (data) {
            list.push(data)
        }
    }

    if (oldAddress != '') {
        const data = await Counselor.find({ address1: { $regex: newAddress } });
        if (data) {
            list.push(data)
        }
    }

    if(list) {
        return list
    }
    return res.send('오류')
}