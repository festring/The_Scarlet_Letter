// content.js (content script)

// 초기 페이지 로딩 시 메시지 전송
sendMessageToPopup();

// 1초마다 페이지 감시
setInterval(() => {
    sendMessageToPopup();
}, 1000);

// 메시지 전송 함수
function sendMessageToPopup() {
    // 페이지 내의 모든 div 요소를 가져오기
    const allDivs = document.querySelectorAll('div');

    // 클래스가 "warning"인 div 요소만 필터링
    const warningDivs = Array.from(allDivs).filter(div => div.classList.contains('alba'));

    // 메시지 전송
    chrome.runtime.sendMessage({ warningCount: warningDivs.length });
}
