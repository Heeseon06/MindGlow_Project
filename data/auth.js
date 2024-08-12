import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'

const clientSchema = new Mongoose.Schema({
    userid: {type: String, require: true},
    userpw: {type: String, require: true},
    name: {type: String, require: true},
    hp: {type: String, require: true},
    email: String,
    ssn1: {type: Number, require: true},
    ssn2: {type: Number, require: true}
})
useVirtualId(clientSchema);
const Client = Mongoose.model('Client', clientSchema);

// 아이디 중복검사
export async function findByUserid(userid) {
    return Client.findOne({userid});  // 내장함수
}

// id 중복검사
export async function findById(id) {
    return Client.findById(id);  // 내장함수
}

export async function createUser(user) {
    return new Client(user).save().then((data) => data.id)
}

export async function update(userid, data) {
    return Client.findByIdAndUpdate(userid, data, {new:true})
}