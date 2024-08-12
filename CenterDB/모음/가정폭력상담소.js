// https://data.seoul.go.kr/dataList/OA-15024/S/1/datasetView.do(서울시 가정폭력상담소 정보)(API -> xml,json)
const fs = require('fs');

const key = '704e464e4873656f33314c56786274'
let start = 1
let end = 33
const url = `http://openapi.seoul.go.kr:8088/${key}/json/HmvlnCnsltInfo/${start}/${end}/`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.HmvlnCnsltInfo.row

    })
    .then(data => {
        const extractedData = data.map(item => ({
            centerName: item.NM,
            oldAddress: item.ADDR_OLD,
            newAddress: item.ADDR,
            homepage: item.홈페이지,
            email: '',
            hp: item.TEL,
            gu: item.ADDR_OLD.match(/(\S*구)\s*/)[1], // '구' 추출
            dong: item.ADDR_OLD.match(/\S+(동|로)(?![가-힣])/g)[0], // '동' 추출
            lat: item.XCODE,
            lot: item.YCODE,
            kind: '4'
        }));


        const jsonData = JSON.stringify(extractedData);

        fs.writeFile('centers4.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('JSON 파일이 저장되었습니다.');
        });
    })
    .catch(error => {
        console.log(error);
    });

// 데이터 33개

// 컬럼 정보
// ID: 1,
// NM: '은평가정폭력상담소',
// ADDR_OLD: '서울특별시 은평구 수색동 8-15번지 ',
// ADDR: '서울특별시 은평구 은평터널로 48  (수색동)',
// PERMISSION_DT: '20000901',
// STATE: '운영중',
// STOP_DT: '',
// SUSPENSION_START_DT: '',
// SUSPENSION_END_DT: '',
// RE_OPEN_DT: '',
// AREA: '',
// POST: '',
// KIND: '0201',
// KIND_NM: '가정폭력상담소',
// TEL: '02326 1366',
// XCODE: '191107.82511600000  ',
// YCODE: '453948.68692100000  ',
// PERMISSION_NO: '3110000200000028',
// DETAIL_STAT_NM: ''