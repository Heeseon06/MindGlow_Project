// https://www.data.go.kr/data/15055355/fileData.do (서대문구 여성관련 복지시설)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 11;
const url = `https://api.odcloud.kr/api/15055355/v1/uddi:89cbf5e5-95ec-49fb-a3a1-d00b619ef85d?page=${page}&perPage=${row}&serviceKey=${key}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.data)
        console.log(data.totalCount)
    })
    .catch(error => {
        console.log(error);
    });

    // '여성센터',
    // '성폭력상담소',
    // '가정폭력상담소',
    // '가정 성폭력 상담원 교육훈련시설',
    // '한부모가족복지시설',
    // '건강가정지원시설',
    // '다문화가족지원시설'