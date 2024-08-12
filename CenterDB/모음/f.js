// https://www.data.go.kr/tcs/dss/selectFileDataDetailView.do?publicDataPk=3077033(여성가족부_다문화가족지원센터 현황)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 10;
const url = `https://api.odcloud.kr/api/3077033/v1/uddi:3fc0bf24-6e3c-433f-9efc-e6f518ce9280?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.data)
    })
    .catch(error => {
        console.log(error);
    });

// 232개