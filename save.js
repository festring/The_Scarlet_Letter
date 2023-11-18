// background.js (또는 content.js, popup.js 등)

// 초기화 함수
function initializeCheckbox() {
    chrome.storage.sync.get(['checkboxChecked'], function(result) {
        // 저장된 값이 있으면 체크박스 설정을 적용
        if (result.checkboxChecked) {
            console.log('Checkbox is checked');
        } else {
            console.log('Checkbox is unchecked');
        }
    });
}

// 체크박스 상태 변경 이벤트 리스너
document.querySelector('input[type="checkbox"]').addEventListener('change', function() {
    // 체크박스 상태를 저장
    chrome.storage.sync.set({ 'checkboxChecked': this.checked });

    // 체크박스 상태를 출력
    if (this.checked) {
        console.log('Checkbox is checked');
    } else {
        console.log('Checkbox is unchecked');
    }
});

// 페이지 로드 시 초기화 함수 호출
initializeCheckbox();
