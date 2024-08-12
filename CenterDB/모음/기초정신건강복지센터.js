// https://www.data.go.kr/data/3049990/fileData.do(국립정신건강센터_정신건강 관련기관 정보)(제거할거많음)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 2786;
const url = `https://api.odcloud.kr/api/3049990/v1/uddi:14a6ea21-af95-4440-bb05-81698f7a1987?page=${page}&perPage=${row}&serviceKey=${key}`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data.data)
        console.log(data.totalCount)
        const filteredData = data.data.filter(item => {
            return item.기관구분.includes('기초정신건강복지센터');
        })
        return filteredData
    })
    .then(data => {
        const filteredData = data.filter(item => {
            return item.주소.includes('서울특별시');
        })
        return filteredData
    })
    .then(data => {
        const extractedData = data.map(item => ({
            centerName: item.기관명,
            oldAddress: '',
            newAddress: item.주소,
            homepage: item.홈페이지,
            email: '',
            hp: '',
            gu: item.주소.match(/(\S*구)\s*/)[1], // '구' 추출
            dong: '',
            lat: '',
            lot: '',
            kind: '2'
        }));

        
        const jsonData = JSON.stringify(extractedData);

        fs.writeFile('centers2.json', jsonData, 'utf8', (err) => {
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

// 데이터 25개

// 컬럼 정보
    // '기관구분'
    // '기관명'
    // '주소'
    // '홈페이지'