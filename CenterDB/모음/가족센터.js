// https://www.data.go.kr/tcs/dss/selectFileDataDetailView.do?publicDataPk=3077033(여성가족부_다문화가족지원센터 현황)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 232;
const url = `https://api.odcloud.kr/api/3077033/v1/uddi:3fc0bf24-6e3c-433f-9efc-e6f518ce9280?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.data
    })
    .then(data => {
        const filteredData = data.filter(item => {
            return item.지역.includes('서울');
        });
        return filteredData
    })
    .then(data => {
        const extractedData = data.map(item => {
            let centerNM;
            if (item.시군구명.includes('서울특별시')) {
                centerNM = '서울시';
            } else {
                centerNM = item.시군구명;
            }

            return {
                centerName: `${centerNM}${item.센터유형}`,
                oldAddress: '',
                newAddress: item.주소,
                homepage: '',
                email: '',
                hp: item.전화,
                gu: item.주소.match(/(\S*구)\s*/)[1], // '구' 추출
                dong: '',
                lat: '',
                lot: '',
                kind: '5'
            };
        });


        const jsonData = JSON.stringify(extractedData);
        console.log(data.length)

        fs.writeFile('centers5.json', jsonData, 'utf8', (err) => {
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

// 데이터 10개

// 컬럼 정보
// '센터유형': '가족센터',
// '시군구명': '노원구',
// '전화': '02-979-3501',
// '주소': '(01857) 서울특별시 노원구 동일로173가길 94 가온빌딩 3층',
// '지역': '서울'