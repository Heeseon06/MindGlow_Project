const fs = require('fs');

// 파일을 읽어올 경로 설정
const fileNames = ['centers1.json', 'centers2.json', 'centers3.json', 'centers4.json', 'centers5.json', 'centers6.json', 'centers7.json', 'centers8.json'];

let combinedCenters = [];

// 모든 파일을 읽어와서 하나의 배열로 합침
fileNames.forEach(fileName => {
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    combinedCenters = combinedCenters.concat(data);
});

// 합쳐진 데이터의 개수 출력
console.log('총 합쳐진 데이터의 개수:', combinedCenters.length);

// 합쳐진 데이터를 JSON 파일로 저장
fs.writeFileSync('combinedCenters.json', JSON.stringify(combinedCenters, null, 2));