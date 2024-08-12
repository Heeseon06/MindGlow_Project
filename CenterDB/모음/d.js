// https://data.seoul.go.kr/dataList/OA-15024/S/1/datasetView.do(서울시 가정폭력상담소 정보)(API -> xml,json)
const fs = require('fs');

const key = '704e464e4873656f33314c56786274'
let start = 1
let end = 33
const url = `http://openapi.seoul.go.kr:8088/${key}/json/HmvlnCnsltInfo/${start}/${end}/`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.HmvlnCnsltInfo.row)
    })
    .catch(error => {
        console.log(error);
    });

// 33개