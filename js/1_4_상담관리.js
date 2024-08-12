function showList() {
    const userid = checkCookie('userid')
    const exist = checkCookie('center');
    console.log(userid, exist)
    if (exist) {
        // 주체가 상담사
        counselorFetch(userid)
    } else {
        // 주체가 고객
        clientFetch(userid)
    }
}

// center 라는 쿠키의 유무 확인
function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
}

function clientFetch(userid) {
    fetch(`../management/Cli/${userid}`).then(response => response.json())
        .then(data => {
            data.forEach(reserve => {
                const container = document.querySelector('.chatting_container')

                // 시간 => 우리 시간으로 변경
                const utcDate = new Date(reserve.createdAt)
                const koreanTimeOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
                const koreanDate = new Date(utcDate.getTime() + koreanTimeOffset);
                let Kdate = koreanDate.toISOString()
                Kdate = Kdate.replace('T', ' ');
                let indexOfSecondColon = Kdate.indexOf(':', Kdate.indexOf(':') + 1);
                if (indexOfSecondColon !== -1) {
                    Kdate = Kdate.substring(0, indexOfSecondColon);
                }
                console.log(reserve.active)
                const newContent = (reserve.active == '비활성화') ? `
            <img src="../project_img/announcement.png" alt="회원정보변경" class="walking">
                    <h4>${reserve.counselorName} 상담사가 확인중 입니다.</h4>
                    <p>${Kdate}</p>
                    <p class="next"></p>
            ` : `
            <img src="../project_img/announcement.png" alt="회원정보변경" class="walking">
                    <h4>${reserve.counselorName} 상담사 채팅방</h4>
                    <p>${Kdate}</p>
                    <p class="next">입장</p>
            `
                const newElement = document.createElement('button')
                // const newElement = (reserve.active == '활성화') ? document.createElement('button') : document.createElement('div');
                newElement.innerHTML = newContent

                container.appendChild(newElement);

                if (reserve.active == '활성화') {
                    container.addEventListener('click', (event) => {
                        if (event.target.tagName === 'BUTTON') {
                            console.log('채팅방입장')
                            // 채팅방 입장
                            window.location.href = `../path/4/${reserve.chatName}`
                        }
                    })
                }
            })
        })
}
function counselorFetch(userid) {
    fetch(`../management/Cou/${userid}`).then(response => response.json())
        .then(data => {
            data.forEach(reserve => {
                const container = document.querySelector('.chatting_container')

                // 시간 => 우리 시간으로 변경
                const utcDate = new Date(reserve.createdAt)
                const koreanTimeOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
                const koreanDate = new Date(utcDate.getTime() + koreanTimeOffset);
                let Kdate = koreanDate.toISOString()
                Kdate = Kdate.replace('T', ' ');
                let indexOfSecondColon = Kdate.indexOf(':', Kdate.indexOf(':') + 1);
                if (indexOfSecondColon !== -1) {
                    Kdate = Kdate.substring(0, indexOfSecondColon);
                }
                
                const newContent = (reserve.active == '비활성화') ? `
            <img src="../project_img/announcement.png" alt="회원정보변경" class="walking">
                    <h4>${reserve.clientName} 고객이 대기중 입니다.</h4>
                    <p>${Kdate}</p>
                    <p class="next">수락</p>
            ` : `
            <img src="../project_img/announcement.png" alt="회원정보변경" class="walking">
                    <h4>${reserve.clientName} 고객과의 채팅방</h4>
                    <p>${Kdate}</p>
                    <p class="next">입장</p>
            `
                const newElement = document.createElement('button')
                newElement.innerHTML = newContent

                container.appendChild(newElement);

                if (reserve.active == '비활성화') {
                    container.addEventListener('click', (event) => {
                        if (event.target.tagName === 'BUTTON') {
                            fetch(`../json/${reserve.chatName}`)
                            .then(() => updateActive(reserve.chatName))
                            location.reload()
                        }
                    })
                } else {
                    // 활성화시
                    container.addEventListener('click', (event) => {
                        if (event.target.tagName === 'BUTTON') {
                            console.log('채팅방입장')
                            // 채팅방 입장
                            window.location.href = `../path/4/${reserve.chatName}`
                        }
                    })
                }
            })
        })
}
function updateActive(chatName) {
    fetch(`../management/act/${chatName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // JSON 형식의 데이터 전송
        },
        body: JSON.stringify({ active: '활성화' }) // 데이터 본문에 JSON 문자열화된 데이터 포함
    });
}

showList()