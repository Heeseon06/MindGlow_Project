function getCookie(cookie_name) {
    // 쿠키 t_title 가져오기
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갬
        const parts = cookie.trim().split('=');
        if (parts[0] === cookie_name) {
            // 디코딩하여 출력
            console.log(parts[0], ':', decodeURIComponent(parts[1]));
            return decodeURIComponent(parts[1]);
        }
    }
    return null;
}

const userid = document.getElementById('userid')
const C_center = getCookie('center')
const C_userid = getCookie('userid')
let url = ''
userid.value = C_userid

function action(url) {
    const loginform = document.getElementById('loginform')
    loginform.action = `/path/${url}/${C_userid}`
    console.log(loginform.action)
}

function onPageLoad() {

    if(C_center){
        url = 'counselor'
    } else{
        url = 'client'
    }
    console.log(url)
    action(url)
}

document.addEventListener('DOMContentLoaded', onPageLoad);