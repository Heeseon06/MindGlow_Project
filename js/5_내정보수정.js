function sendit() {
    // id 패턴 검사
    const userid = document.getElementById('userid')
    const condi_Id = /^[A-Za-z0-9]{4,20}$/
    if (!condi_Id.test(userid.value)) {
        alert('아이디는 4자이상 20자이하의 영문자로 입력하세요')
        userid.focus();
        return false;
    }

    // 패스워드 패턴 검사
    const userpw = document.getElementById('userpw')
    const expPwText = /^(?=.*[A-Za-z])(?=.*[~!@#$%^&*+=-])(?=.*[0-9]).{4,20}$/
    if (!expPwText.test(userpw.value)) {
        alert('비밀번호 4자리이상 20자리이하의 영문자, 숫자, 특수문자를 1자 이상 포함해야합니다.')
        userpw.focus();
        return false;
    }

    // 패스워드 한번 더 검사
    const userpw_re = document.getElementById('userpw_re')
    if (userpw.value != userpw_re.value) {
        alert('비밀번호가 다릅니다.')
        userpw_re.focus()
        return false
    }

    // 핸드폰 패턴 검사
    const hp = document.getElementById('hp')
    const expHp = /^\d{3}-\d{3,4}-\d{4}/
    if (!expHp.test(hp.value)) {
        alert('정수 3자리-(정수 3자리 or 4자리)-정수 4자리')
        hp.focus()
        return false
    }

    // 이메일 패턴 검사
    const email = document.getElementById('email')
    const expEmail = /^[A-Za-z0-9\-\_]+@[A-za-z0-9]+\.[A-Za-z\.]+$/
    if (email.value) {
        if (!expEmail.test(email.value)) {
            alert('이메일을 다시 입력해주세요')
            email.focus()
            return false
        }
    }

    return true
    /* true -> 화면이동, false - 화면이동x */
}


// 패스워드 동일한지 확인
const passwordInput = document.getElementById('new_userpw');
const passwordReInput = document.getElementById('new_userpw_re');
const message = document.getElementById('message');

passwordReInput.addEventListener('blur', function () {
    const password = passwordInput.value;
    const passwordRe = passwordReInput.value;

    if (password === passwordRe && password !== '') {
        message.textContent = '비밀번호가 확인되었습니다.';
        message.style.color = 'green';
    } else {
        message.textContent = '비밀번호가 다릅니다.';
        message.style.color = 'red';
    }
});

// 휴대폰 작성
const hpInput = document.getElementById('hp');

hpInput.addEventListener('input', function (event) {
    const value = event.target.value;
    const cleanValue = value.replace(/[^0-9]/g, ''); // 숫자만 허용

    // 현재 포커스된 섹션을 찾습니다.
    let currentSection = 0;
    if (hpInput.selectionStart !== null) {
        currentSection = Math.floor(hpInput.selectionStart / 5);
    }

    let formattedValue = '';
    for (let i = 0; i < cleanValue.length && i < 11; i++) {
        // 세 번째 섹션 이후에는 숫자를 입력하지 않습니다.
        if ((i === 3 || i === 7) && cleanValue.length > i) {
            formattedValue += '-';
        }
        formattedValue += cleanValue[i];
    }

    hpInput.value = formattedValue;

    // 입력 후 자동으로 다음 섹션으로 이동합니다.
    if (currentSection < 3) {
        hpInput.setSelectionRange((currentSection + 1) * 5, (currentSection + 1) * 5);
    }
});