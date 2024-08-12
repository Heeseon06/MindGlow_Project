// https://www.data.go.kr/data/15109781/openapi.do(청소년상담복지센터)(API -> xml,json)
const fs = require('fs');

const key = 'oeK3EYH5mBFYKGuBvM2%2ByigeT%2Fkpnp%2FChZNXkIELcBglIhrIEDJbFrRpv33HtS5xbBFintLzOxVlJGFgShF5FQ%3D%3D';
let page = 1;
let row = 239; // 239
const url = `https://apis.data.go.kr/1383000/gmis/teenDscsnSrcnServiceV2/getTeenDscsnSrcnListV2?serviceKey=${key}&pageNo=${page}&numOfRows=${row}&type=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const filteredData = data.response.body.items.item.filter(item => {
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
            kind: '1'
        }));

        
        const jsonData = JSON.stringify(extractedData);
        console.log(data.length)

        fs.writeFile('centers1.json', jsonData, 'utf8', (err) => {
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
    // "cnterNm": 센터의 이름
    // "cnterChNm": 센터 담당자의 이름
    // "instlTypeCn": 설치 유형 (여기서는 공공으로 표시됨)
    // "operModeCn": 운영 모드 (위탁으로 표시됨)
    // "ctpvNm": 시도명 (서울로 표시됨)
    // "sggNm": 시군구명 (서울의 각 구에 대한 정보가 표시됨)
    // "roadNmAddr": 도로명 주소
    // "lotnoAddr": 지번 주소
    // "lat": 위도
    // "lot": 경도
    // "hmpgAddr": 홈페이지 주소
    // "rprsTelno": 대표 전화번호
    // "fxno": 팩스번호
    // "emlAddr": 이메일 주소
    // "operHrCn": 운영 시간에 대한 설명
    // "hldyCn": 휴무일에 대한 설명
    // "utztnMthdCn": 이용 방법에 대한 설명
    // "sprtCnt": 제공하는 프로그램에 대한 설명
    // "nrbSbwNm": 근처 지하철역
    // "nrbBusStnNm": 근처 버스 정류장
    // "pknFcltYn": 주차 시설 유무
    // "insvsPsbltyYn": 실내 시설 이용 가능 여부
    // "vsdscPsbltyYn": 방문 상담 가능 여부
    // "mtispPsbltyYn": 모바일 상담 가능 여부
    // "dscsnMnpwCnt": 상담실 수
    // "crtrYmd": 데이터 생성일