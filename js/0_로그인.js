// 고객과 상담사 선택기능
const clientButton = document.getElementById('client');
const counselorButton = document.getElementById('counselor');
const hidden = document.getElementById('hidden');
const loginform = document.getElementById('loginform')

clientButton.addEventListener('click', function () {
        counselorButton.classList.add('non-select');
        this.classList.remove('non-select');
        counselorButton.disabled = false;
        this.disabled = true;
        localStorage.setItem('userType', 'client');
        loginform.action = '/client/login'
});

counselorButton.addEventListener('click', function () {
        clientButton.classList.add('non-select');
        this.classList.remove('non-select');
        clientButton.disabled = false;
        this.disabled = true;
        localStorage.setItem('userType', 'counselor');
        loginform.action = '/counselor/login'
});
