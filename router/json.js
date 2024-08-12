import express from 'express';
// import fs from 'fs';
import fs from 'fs/promises';
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/:chatName', (req, res) => {
  console.log('hi')
  const { chatName } = req.params
  const folderPath = path.join(__dirname, '../chatting');
  const filePath = path.join(folderPath, `${chatName}.json`);
  try {
    // 폴더 존재 여부 확인 및 생성
    fs.access(folderPath).catch(async () => {
      await fs.mkdir(folderPath);
    });

    // 파일 존재 여부 확인 및 생성
    fs.access(filePath).catch(async () => {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    });

    res.send('Folder and file created or already exist.');
  } catch (error) {
    console.error('Error handling file:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:chatName/save', async (req, res) => {
  const { chatName } = req.params
  const { userId, receiverId, message, createdAt } = req.body
  // 새로운 데이터
  const newData = {
    userId: userId,
    receiverId: receiverId,
    message: message,
    createdAt: createdAt
  }

  // JSON 파일 경로
  const basePath = path.join(__dirname, `../chatting/${chatName}.json`);

  try {
    // 기존 데이터 로드
    let data = await fs.readFile(filePath, 'utf-8'); // wait를 빼면 오류, 넣으면 소켓연결끊겨 오류;
    data = JSON.parse(data);

    // 데이터 추가
    data.push(newData);

    // JSON 파일에 쓰기
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error');
  }
})

export default router