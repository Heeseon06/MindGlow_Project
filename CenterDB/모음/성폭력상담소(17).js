// https://data.seoul.go.kr/dataList/OA-15297/F/1/datasetView.do(서울시 성폭력피해상담소 정보)(csv)
const fs = require('fs');
const csv = require('csv-parser');

// CSV 파일 경로
const csvFilePath = 'violate.csv';
// 새로운 JSON 파일 경로
const jsonFilePath = 'centers8.json';

// 추출한 데이터를 저장할 배열
const extractedData = [];

fs.createReadStream(csvFilePath, { encoding: 'utf-8' })
    .pipe(csv())
    .on('data', (row) => {
        const newData = {
            centerName: row.사업장명,
            oldAddress: row.도로명전체주소,
            newAddress: row.소재지전체주소,
            homepage: row.전화번호,
            email: '',
            hp: row.전화,
            gu: row.소재지전체주소.match(/(\S*구)\s*/)[1], // '구' 추출
            dong: '',
            lat: row['위치정보(X)'],
            lot: row['위치정보(Y)'],
            kind: '3'
        };
        // 추출한 데이터를 배열에 추가
        extractedData.push(newData);
    })
    .on('end', () => {
        // 추출한 데이터를 JSON 형식으로 저장
        fs.writeFile(jsonFilePath, JSON.stringify(extractedData, null, 2), (err) => {
            if (err) throw err;
            console.log('데이터를 JSON 파일로 저장했습니다.');
        });
    });


// 17

// 컬럼정보
//   '번호': '17',
//   '사업장명': '군성폭력상담소',
//   '소재지전체주소': '서울특별시 마포구 신촌로14길 20 태안빌딩 4층',
//   '도로명전체주소': '',
//   '개업일자': '',
//   '영업상태명': '운영중',
//   '폐업일자': '',
//   '휴업시작일자': '',
//   '휴업종료일자': '',
//   '소재지면적': '',
//   '소재지우편번호': '',
//   '여성복지시설종류': '202',
//   '여성복지시설종류명': '성폭력상담소',
//   '전화번호': '02-733-7119',
//   '위치정보(X)': '',
//   '위치정보(Y)': '',
//   '상세영업상태명': '영업'