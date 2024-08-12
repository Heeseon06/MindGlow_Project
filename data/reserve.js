import Mongoose from 'mongoose'

const reserveSchema = new Mongoose.Schema({
    clientId: { type: String, require: true },
    clientName: { type: String, require: true },
    counselorId: { type: String, require: true },
    counselorName: { type: String, require: true },
    chatName: {type: String, require:true},
    active: {type: String, require:true}
}, {timestamps: true});
const Reserve = Mongoose.model('reserve', reserveSchema);


export async function create({ clientId, clientName, counselorId, counselorName, chatName, active }) {
    return new Reserve({ clientId, clientName, counselorId, counselorName, chatName, active }).save().then((data) => data._id)
}

export async function findDuplication({clientId, counselorId}) {
    try {
        // 주어진 clientId와 counselorName을 조건으로 데이터를 추출
        const result = await Reserve.findOne({ clientId, counselorId });
        return result;
    } catch (error) {
        console.error('Error finding duplication:', error);
        throw error;
    }
}

export async function findByClient(clientId){
    try {
        const result = await Reserve.find({clientId}).sort({createAt: -1});
        return result;
    } catch (error) {
        console.error('Error finding duplication:', error);
        throw error;
    }
}
export async function findByCounselor(counselorId){
    try {
        const result = await Reserve.find({counselorId}).sort({createAt: -1});
        console.log(result)
        return result;
    } catch (error) {
        console.error('Error finding duplication:', error);
        throw error;
    }
}
export async function findIdByChatName(chatName){
    const result = await Reserve.findOne({chatName})
    return result._id
}

export async function updateActive(id, active){
    return Reserve.findByIdAndUpdate(id, active, { new: true });
}