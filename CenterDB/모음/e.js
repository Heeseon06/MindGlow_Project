// https://www.data.go.kr/data/15109785/openapi.do#/API%20%EB%AA%A9%EB%A1%9D/getSfCnterListV2(여성가족부_해바라기센터)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 44;
const url = `https://apis.data.go.kr/1383000/gmis/sfCnterServiceV2/getSfCnterListV2?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.response.body.items.item)
    })
    .catch(error => {
        console.log(error);
    });

// 44개