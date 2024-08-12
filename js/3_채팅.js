function getCenterCookie() {
    // 쿠키 문자열을 가져옵니다.
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갭니다.
        const parts = cookie.trim().split('=');
        if (parts[0] === 'center') {
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

const centerName = getCenterCookie()
console.log(centerName)
const userId = getUseridCookie()
let kind = ''
if (centerName) {
    kind = 'Cou'
} else { kind = 'Cli' }
let chatName = ''
let createdAt = ''
let userName = ''
const socket = io();

fetch(`../../management/${kind}/${userId}`)
    .then(response => {
        return response.json()
    }).then(data => {
        // Extract the room ID from the URL
        chatName = data[0].chatName
        const room = chatName;

        let partner = ''
        if (kind == 'Cou') {
            partner = data[0].clientId
            userName = data[0].counselorName
        } else {
            partner = data[0].counselorId
            userName = data[0].clientName
        }
        console.log('상대방:', partner)

        socket.on('chat message', (msg) => {
            displayMessage(msg, msg.kind);
        });

        createdAt = ''//data[0].createdAt
        document.getElementById('send-button').addEventListener('click', () => {
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value;
            let sender = ''
            if (kind == 'Cli') {
                sender = userName;
            } else {
                sender = userName + ' 상담사'
            }


            if (message) {
                const msg = { sender, message, room, kind };
                socket.emit('chat message', msg);
                messageInput.value = '';
            }
        });
        
    

        function displayMessage(msg, decide) {
            const chatBox = document.getElementsByClassName('chatBox')[0]
            const messageElement = document.createElement('div');
            messageElement.className = `message ${decide}`;
            messageElement.innerHTML = `<div class="user"><p>${msg.sender}</p></div>
                                <div class='text'><p>${msg.message}</p></div>
                                `;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        // Fetch previous messages for the room
    })
