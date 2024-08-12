function getCenterCookie() {
    // 쿠키 문자열을 가져옵니다.
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갭니다.
        const parts = cookie.trim().split('=');
        if (parts[0] === 'centerName') {
            // 디코딩하여 출력합니다.
            console.log(parts[0], ':', decodeURIComponent(parts[1]));
            return decodeURIComponent(parts[1]);
        }
    }
    return null;
}
function getUseridCookie() {
    // 쿠키 문자열을 가져옵니다.
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갭니다.
        const parts = cookie.trim().split('=');
        if (parts[0] === 'userid') {
            // 디코딩하여 출력합니다.
            console.log(parts[0], ':', decodeURIComponent(parts[1]));
            return decodeURIComponent(parts[1]);
        }
    }
    return null;
}

function output() {
    try {
        const centerName = getCenterCookie();
        console.log('js : ', centerName);

        fetch(`../../path/3/1/${centerName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                for (let user of data) {
                    const newContent = `
                    <div class="counselor">
                        <h3 id="userid" name="${user[0]['userid']}">${user[0]['name']}</h3>
                        <button class="btn">상담예약</button>
                        <p id="centerName">${centerName}</p>
                    </div>
                `;

                    let newElement = document.createElement('div');
                    newElement.innerHTML = newContent;

                    document.getElementById('counselor').appendChild(newElement);

                    // 새로 추가된 버튼에 이벤트 리스너 추가
                    newElement.querySelector('.btn').addEventListener('click', function() {
                        const client = getUseridCookie()
                        const counselor = user[0]['userid']

                        fetch(`../../management/${client}/${counselor}`).then(response =>{
                            return response.json()
                        }).then(data => {
                            if(data=='중복'){
                                alert('이미 예약하셨습니다.')
                            }else{
                                window.location.href='../../path/4'
                            }
                        })
                        // 여기에서 원하는 동작을 추가합니다.
                        
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

window.onload = function() {
    output();
};