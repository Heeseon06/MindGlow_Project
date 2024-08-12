// https://www.data.go.kr/data/15109785/openapi.do#/API%20%EB%AA%A9%EB%A1%9D/getSfCnterListV2(여성가족부_해바라기센터)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 44;
const url = `https://apis.data.go.kr/1383000/gmis/sfCnterServiceV2/getSfCnterListV2?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.response.body.items.item
    })
    .then(data => {
        const filteredData = data.filter(item => {
            return item.lotnoAddr.includes('서울특별시');
        });
        return filteredData
    })
    .then(data => {
        const extractedData = data.map(item => ({
            centerName: item.cnterNm,
            oldAddress: item.lotnoAddr,
            newAddress: item.roadNmAddr,
            homepage: item.hmpgAddr,
            email: item.emlAddr,
            hp: item.rprsTelno,
            gu: item.lotnoAddr.match(/(\S*구)\s*/)[1], // '구' 추출
            dong: item.lotnoAddr.match(/\S+(동|로)(?![가-힣])/g)[0], // '동' 추출
            lat: item.lat,
            lot: item.lot,
            kind: '7'
        }));

        
        const jsonData = JSON.stringify(extractedData);
        console.log(data.length)

        fs.writeFile('centers7.json', jsonData, 'utf8', (err) => {
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
// cnterNm: '제주해바라기센터(별관)',
// cnterChNm: '',
// fcltTypeNm: '통합형',
// ctpvNm: '제주',
// sggNm: '제주시',
// roadNmAddr: '제주특별자치도 제주시 남녕로 5-3 3층',
// lotnoAddr: '제주특별자치도 제주시 노형동 1294-2 3층',
// lat: 33.48839067,
// lot: 126.4826211,
// hmpgAddr: 'www.jjonestop.or.kr',
// rprsTelno: '0647485117',
// fxno: '0647486117',
// emlAddr: '117stop@hanmail.net',
// cnsgnHsptlNm: '한라병원',
// operYn: 'Y',
// operHrCn: '매일 00:00 - 24:00',
// hldyCn: '',
// nrbSbwNm: '',
// nrbBusStnNm: '남녕고등학교, 월랑마을 남녕고등학교',
// sprtCnt: '상담지원, 의료지원, 수사지원, 법률지원, 심리지원 등',
// crtrYmd: '20221215'