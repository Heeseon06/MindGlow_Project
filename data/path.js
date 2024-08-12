import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'

const CenterSchema = new Mongoose.Schema({
  centerName: {type: String, require: true},
  oldAddress: String,
  newAddress: {type: String, require: true},
  homepage: String,
  email: String,
  hp: String,
  gu: {type: String, require: true},
  dong: String,
  lat: String,
  lot: String,
  kind: {type: String, require: true}
});
useVirtualId(CenterSchema);
const Center = Mongoose.model('centerData', CenterSchema);

export async function findByCenterName(centerName) {
    try {
        const center = await Center.findOne({ centerName });
        console.log('1',center);
        console.log('oldAddress: ',center.oldAddress)
        console.log('newAddress: ',center.newAddress)
        return {
            oldAddress: center.oldAddress,
            newAddress: center.newAddress
        };
    } catch (err) {
        console.error(err);
        throw err; // 에러 처리를 위해 에러를 다시 throw합니다.
    }
}

// // 아이디 중복검사
// export async function findByUserid(userid) {
//     return Counselor.findOne({userid});  // 내장함수
// }

// // id 중복검사
// export async function findById(id) {
//     return Counselor.findById(id);  // 내장함수
// }




// return Counselor.findOne({userid});
// return Counselor.findById(id);
// return new Center(centerName).save().then((data) => data.id)