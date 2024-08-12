function getTitleCookie() {
    // 쿠키 t_title 가져오기
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        // 공백을 제거한 후 '='을 기준으로 쪼갬
        const parts = cookie.trim().split('=');
        if (parts[0] === 't_title') {
            // 디코딩하여 출력
            console.log(parts[0], ':', decodeURIComponent(parts[1]));
            return decodeURIComponent(parts[1]);
        }
    }
    return null;
}
function getResultCookie() {
    // 쿠키 t_result 가져오기
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const parts = cookie.trim().split('=');
        if (parts[0] === 't_result') {
            console.log(parts[0], ':', decodeURIComponent(parts[1]));
            return decodeURIComponent(parts[1]);
        }
    }
    return null;
}

function checkTokenOnPageLoad() {
    let t_title = getTitleCookie()
    const t_result = getResultCookie()

    const score = document.getElementById('score')
    score.innerText = t_title
    const result = document.getElementById('result')
    result.innerText = t_result

    t_title = t_title.split('부분')[0]

    if (t_title == '우울증') {
        const newContent = `
                    <p class="ref_score">▪40점 이하</p>
                    <p class="ref_content">다행히 지금 상태는 우울증이 아닙니다.<br>계속 마음건강에 힘써 주세요.</p>
                    <p class="ref_score">▪41점~50점</p>
                    <p class="ref_content">경증의 우울상태라 볼 수 있습니다.<br>힘들다고 느끼신다면 조기에 전문적인 도움을 받아보세요.</p>
                    <p class="ref_score">▪51점~60점</p>
                    <p class="ref_content">상당한 정도의 우울상태에 있습니다.<br>지금 같은 상태가 한 달 이상 지속되었다면 가급적 빨리 전문가에게 도움을 요청하십시오.</p>
                    <p class="ref_score">▪60점 이상</p>
                    <p class="ref_content">중증 우울상태에 있습니다.<br>우울함은 의지로 이겨낼 수 있는 증상이 아닙니다. 속히 전문가에게 치료를 받으십시오.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);
    } else if (t_title == '공황장애') {
        const newContent = `
                    <p class="ref_score">▪1-11문항에서 ‘예’ 3개 이상,<br>
                    &nbsp;&nbsp;12-13문항에서 ‘예’ 1개 이상 체크</p>
                    <p class="ref_content">공황을 경험하셨다고 볼 수 있습니다.
                    <br>그렇다고 해서 공황장애를 겪고 있다고는 볼 수 없으니 정확한 진단을 얻고 싶으시다면 전문가의 도움을 요청하세요.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);

    } else if (t_title == '스트레스') {
        const newContent = `
                    <p class="ref_score">▪5점 이하</p>
                    <p class="ref_content">현재는 스트레스 상황에 잘 대처하고 계십니다.</p>
                    <p class="ref_score">▪5점~10점</p>
                    <p class="ref_content">여러 가지 스트레스를 오랫동안 받아오신 것 같습니다. 장기간 지속되는 스트레스는 심리적 문제와 직결됩니다. 전문가에게 도움을 요청하기 바랍니다.</p>
                    <p class="ref_score">▪11점 이상</p>
                    <p class="ref_content">과도한 스트레스에 시달려 현재 위험한 상태인 것 같습니다. 더 이상 혼자 힘으로 이겨내려고 하거나 방치하지 마시고 속히 전문가에게 치료를 받으십시오.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);

    } else if (t_title == 'ADHD') {
        const newContent = `
                    <p class="ref_score">▪15점 이하</p>
                    <p class="ref_content">안심하셔도 됩니다. 현재는 건강한 상태입니다.</p>
                    <p class="ref_score">▪16점~25점</p>
                    <p class="ref_content">과잉행동장애를 생각해 볼 수 있습니다. 정확한 진단은 전문가의 도움을 받으세요.</p>
                    <p class="ref_score">▪26점 이상</p>
                    <p class="ref_content">과잉행동장애라고 볼 수 있는 가능성이 매우 높습니다. 조기 개입이 필요하니 전문가의 도움을 받으시기 바랍니다.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);
    } else if (t_title == '대인불안증') {
        const newContent = `
                    <p class="ref_score">▪27점 이하</p>
                    <p class="ref_content">대인관계에서 별다른 문제는 없어 보입니다.</p>
                    <p class="ref_score">▪28점~45점</p>
                    <p class="ref_content">대인관계에서 어느 정도 불편함을 느낄 수 있습니다. 개선을 원하신다면 전문가의 도움을 받아보세요.</p>
                    <p class="ref_score">▪46점 이상</p>
                    <p class="ref_content">대인관계에서 여러 가지 어려움을 느끼고 계십니다. 대인관계의 문제는 여러 가지 심리적 문제로 이어질 수 있으니 가급적이면 빨리 전문가에게 도움을 요청하십시오.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);
    } else if (t_title == '불안장애') {
        const newContent = `
                    <p class="ref_score">▪9점 이하</p>
                    <p class="ref_content">불안감은 느낄 수 있으나 일상적인 수준입니다. 마음 건강에 계속 힘써 주세요.</p>
                    <p class="ref_score">▪10점~19점</p>
                    <p class="ref_content">일상생활에서 불편함은 느낄 수 있겠으나, 가벼운 수준의 불안입니다. 그래도 어려움을 느끼신다면 전문가의 도움을 받으세요.</p>
                    <p class="ref_score">▪20점~29점</p>
                    <p class="ref_content">불안이 심한 수준입니다. 일상생활 유지가 어려울 수 있습니다. 혼자서 이겨내려고 하지 마시고 어서 전문가에게 도움을 요청하십시오.</p>
                    <p class="ref_score">▪30점 이상</p>
                    <p class="ref_content">극심한 불안상태일 가능성이 높습니다. 지체하지 마시고 속히 전문가에게 치료를 받으십시오.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);
    } else {
        const newContent = `
                    <p class="ref_score">▪13점 이하</p>
                    <p class="ref_content">일반적인 수준입니다.<br>정상적인 상태라고 볼 수 있습니다.</p>
                    <p class="ref_score">▪14점~17점</p>
                    <p class="ref_content">자살 생각을 많이 하는 것 같습니다.<br>무엇 때문인지 혼자 힘으로 해결이 어렵다면 전문가에게 도움을 요청할 수 있습니다.</p>
                    <p class="ref_score">▪18점~21점</p>
                    <p class="ref_content">자살 생각을 상당히 많이 하고 있습니다.<br>일상생활의 어려움도 충분히 예견됩니다. 전문가에게 도움을 요청하십시오.</p>
                    <p class="ref_score">▪22점 이상</p>
                    <p class="ref_content">자살생각을 매우 많이 하고 있습니다.<br>무엇을 망설이시나요, 미루지 마시고 속히 전문가에게 치료를 받으십시오.</p>
                `;

        const newElement = document.createElement('div')
        newElement.innerHTML = newContent

        document.getElementById('reference').appendChild(newElement);
    }
}

function referenceButton() {
    const button = document.getElementById('click')
    const reference = document.getElementById('reference')

    button.addEventListener('click', function () {
        reference.classList.toggle('hidden');
        this.blur()
    });

    const refScores = document.querySelectorAll(".ref_score");
            const totalScores = refScores.length;

            if (totalScores <= 1) {
                
            }
            else if(totalScores <= 2) {
                refScores[totalScores - 1].style.color = "red";
            }
            else {
                refScores[totalScores - 1].style.color = "red";
                refScores[totalScores - 2].style.color = "orange";
            }
}


// 페이지 로드 시 실행합니다.
window.addEventListener('load', checkTokenOnPageLoad);
window.addEventListener('load', referenceButton);