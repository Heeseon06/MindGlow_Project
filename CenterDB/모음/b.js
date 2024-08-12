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
        console.log(filteredData)
        console.log(filteredData.length)
    })
    .catch(error => {
        console.log(error);
    });

    //기초정신건강복지센터