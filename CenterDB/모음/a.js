// https://www.data.go.kr/data/15109781/openapi.do(청소년상담복지센터)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 10;
const url = `https://apis.data.go.kr/1383000/gmis/teenDscsnSrcnServiceV2/getTeenDscsnSrcnListV2?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.response.body.items)
        console.log(data.response.body.totalCount)
    })
    .catch(error => {
        console.log(error);
    });

