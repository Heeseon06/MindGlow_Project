import {config} from './config.js'
import mongoose from 'mongoose'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 디렉토리 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB 연결
const connectDB = async () => {
  try {
    await mongoose.connect(config.db.host)
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Mongoose 모델 정의
const MySchema = new mongoose.Schema({
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

const MyModel = mongoose.model('centerDatas', MySchema);

// JSON 파일 읽기 및 데이터 삽입
const insertData = async () => {
  try {
    const filePath = path.resolve(__dirname, 'combinedCenters.json');
    // 'C:/Users/Administrator/Desktop/Server(5-10)/CenterDB/combinedCenter.json'
    console.log(filePath)

    try {
        await fs.access(filePath);
        console.log('File exists:', filePath);
      } catch (err) {
        console.error('File does not exist:', filePath);
        process.exit(1);
      }

    // JSON 파일 읽기
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // 데이터 삽입
    await MyModel.insertMany(jsonData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

// 실행
const run = async () => {
  await connectDB();
  await insertData();
};

run();