const fs = require('fs');
const axios = require('axios');

const apiKey = '689e0b33eced2f170e3763c2e3558658'; // 카카오 API 키를 여기에 입력하세요.

async function getKakaoGeocode(address) {
  const baseUrl = 'https://dapi.kakao.com/v2/local/search/address.json';
  const headers = {
    'Authorization': `KakaoAK ${apiKey}`
  };
  const params = {
    'query': address
  };

  try {
    const response = await axios.get(baseUrl, { headers, params });
    if (response.data.documents.length > 0) {
      const location = response.data.documents[0].address;
      return {
        lat: location.y,
        lot: location.x
      };
    } else {
      console.log(`No geocode result for address: ${address}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching geocode for address: ${address}`, error);
    return null;
  }
}

function isValidLatLot(lat, lot) {
    if (typeof lat !== 'string') lat = '';
    if (typeof lot !== 'string') lot = '';
    
    lat = lat.trim();
    lot = lot.trim();
    
    const latNum = parseFloat(lat);
    const lotNum = parseFloat(lot);
    
    return !isNaN(latNum) && !isNaN(lotNum) && latNum >= -90 && latNum <= 90 && lotNum >= -180 && lotNum <= 180;
  }
  

async function updateLatLot(jsonFilePath) {
  const rawData = fs.readFileSync(jsonFilePath, 'utf8');
  const data = JSON.parse(rawData);

  for (let entry of data) {
    const lat = entry.lat || '';
    const lot = entry.lot || '';

    if (!isValidLatLot(lat, lot)) {
      const newAddress = entry.newAddress;
      if (newAddress) {
        const geocode = await getKakaoGeocode(newAddress);
        if (geocode) {
          entry.lat = geocode.lat;
          entry.lot = geocode.lot;
        }
      }
    }
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// 예시 사용법
const jsonFilePath = './CenterDB/combinedCenters.json'; // JSON 파일 경로를 여기에 입력하세요.
updateLatLot(jsonFilePath).then(() => {
  console.log('Updated latitude and longitude values.');
});

