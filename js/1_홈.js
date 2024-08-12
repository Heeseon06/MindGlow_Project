const API_KEY = "a5edf49848a662c05fded667dcf8ba41"; //add your API KEY 
const COORDS = 'coords'; //좌표를 받을 변수 

//DOM객체들 
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

//초기화 
function init() {
    askForCoords();
}

//좌표를 물어보는 함수 
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

//좌표를 얻는데 성공했을 때 쓰이는 함수 
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}
//좌표를 얻는데 실패했을 때 쓰이는 함수 
function handleError() {
    console.log("can't not access to location");
}

//날씨 api를 통해 날씨에 관련된 정보들을 받아온다. 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`).then(function (response) {
        return response.json();
    })
        .then(function (json) {
            //온도, 위치, 날씨묘사, 날씨아이콘을 받는다. 
            const temperature = json.main.temp;
            const place = json.name;
            console.log(place)
            const weatherDescription = json.weather[0].description;
            const weatherIcon = json.weather[0].icon;
            const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            //받아온 정보들을 표현한다. 
            weatherInfo.innerHTML = `<p id="place">${place}</p>  ${temperature} °C <br> ${weatherDescription}`;
            weatherIconImg.setAttribute('src', weatherIconAdrs);
        })
        .catch((error) => console.log("error:", error));
}

init();


const quotes = [
    {
        "quote": '오늘의 말',
        "source": "오늘 하루 잘될거에요"
    },
    {
        "quote": '오늘의 말',
        "source": "기죽지마세요"
    },
    {
        "quote": '오늘의 말',
        "source": "이 또한 지나가요"
    },
    {
        "quote": '오늘의 말',
        "source": "공부를 해볼까요?"
    },
]

function randomQuote() {
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    quotation.innerText = `"${random.quote}"`;
    source.innerText = random.source;
}

setInterval(randomQuote, 2000);



function getTokenFromCookie() {
    // 쿠키 문자열을 가져옵니다.
    const cookies = document.cookie.split(';');

    // 각 쿠키를 반복하면서 토큰을 찾습니다.
    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갭니다.
        const parts = cookie.trim().split('=');

        // 토큰 이름이 'token'인 경우 해당 값을 반환합니다.
        if (parts[0] === 'token') {
            console.log(parts[0], ':', parts[1])
            return parts[1];
        }
    }

    // 토큰을 찾지 못한 경우 null을 반환합니다.
    return null;
}

// 페이지 이동시 실행할 함수
function checkTokenOnPageLoad() {
    const token = getTokenFromCookie();

    // 토큰이 없을 경우 로그인 페이지로 리다이렉션합니다.
    if (!token) {
        window.location.href = './';
    }
}

// 페이지 로드 시 실행합니다.
window.onload = checkTokenOnPageLoad;