// https://www.data.go.kr/data/15055355/fileData.do (서대문구 여성관련 복지시설)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 11;
const url = `https://api.odcloud.kr/api/15055355/v1/uddi:89cbf5e5-95ec-49fb-a3a1-d00b619ef85d?page=${page}&perPage=${row}&serviceKey=${key}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const filteredData = data.data.filter(item => {
            return item.구분.includes('성폭력상담소')  || item.구분.includes('건강가정지원시설');
        });        
        console.log(filteredData)
        return filteredData
    })
    .then(data => {
        const extractedData = data.map(item => {
            let kind;
            if (item.구분.includes('성폭력상담소')) {
                kind = '3';
            } else {
                kind = '5';
            }
        
            return {
                centerName: item.시설명,
                oldAddress: '',
                newAddress: `서대문구 ${item.소재지}`,
                homepage: '',
                email: '',
                hp: item.전화번호,
                gu: '서대문구',
                dong: '',
                lat: '',
                lot: '',
                kind: kind
            };
        });
        
        const jsonData = JSON.stringify(extractedData);
        console.log(data.length)

        fs.writeFile('centers3.json', jsonData, 'utf8', (err) => {
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

// 데이터 2개

// 컬럼 정보
// '구분': '다문화가족지원시설',
// '대표자': '노충래',
// '소재지': '증가로244(북가좌동)',
// '시설명': '서대문구 다문화가족지원센터',
// '운영주체': '이화여자대학교 산학협력단',
// '입소자 정원': null,
// '입소자현원': null,
// '전화번호': '02-375-7530',
// '주요사업': '한국어교육, 방문교육, 통번역서비스, 언어영재교실, 자녀언어발달지원, 
// 사례관리',
// '직원수': 9