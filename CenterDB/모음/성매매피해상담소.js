// https://data.seoul.go.kr/dataList/OA-20419/S/1/datasetView.do(서울시 사회복지시설[성매매피해지원시설])(API -> xml,json)
const fs = require('fs');

const key = '795948574a6d6e623635677a574e49';
let page = 1;
let row = 8;
const url = `http://openapi.seoul.go.kr:8088/${key}/json/fcltOpenInfo_PDSI/${page}/${row}/`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.fcltOpenInfo_PDSI.row
    })
    .then(data => {
        const filteredData = data.filter(item => {
            return item.FCLT_KIND_NM.includes('성매매피해상담소');
        });
        return filteredData
    })
    .then(data => {
        const extractedData = data.map(item => ({
            centerName: item.FCLT_NM,
            oldAddress: '',
            newAddress: item.FCLT_ADDR,
            homepage: '',
            email: '',
            hp: item.FCLT_TEL_NO,
            gu: item.FCLT_ADDR.match(/(\S*구)\s*/)[1], // '구' 추출
            dong: '',
            lat: '',
            lot: '',
            kind: '6'
        }));

        
        const jsonData = JSON.stringify(extractedData);
        console.log(data.length)

        fs.writeFile('centers6.json', jsonData, 'utf8', (err) => {
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

// 데이터 6개

// 컬럼 정보
// FCLT_NM: '십대여성인권센터',
// FCLT_CD: 'W2812',
// FCLT_KIND_NM: '(여성) 성매매피해상담소',
// FCLT_KIND_DTL_NM: '성매매피해지원시설',
// JRSD_SGG_SE: '자치구',
// RPRSNTV: '조진경',
// JRSD_SGG_CD: '1156000000',
// JRSD_SGG_NM: '영등포구',
// FCLT_ADDR: '서울특별시 영등포구 당산로38길 9-1, 6,7층 (당산동4가, 은혜빌딩)',
// INMT_GRDN_CNT: 0,
// LVLH_NMPR: 962,
// FCLT_TEL_NO: '0263481318',
// FCLT_ZIPCD: '150650'