let intervalId; // 변수를 사용하여 출력을 제어할 interval ID 저장
// 설정을 저장하는 함수
console.log("popup.js");
function saveSettings() {
    var checkboxValue = document.getElementById("yourCheckboxId").checked;
    chrome.storage.sync.set({ "checkboxSetting": checkboxValue });
}

// 설정을 불러오고 출력을 시작 또는 멈추는 함수
function loadSettings() {
  chrome.storage.sync.get("checkboxSetting", function (result) {
    if (result.checkboxSetting !== undefined) {
      document.getElementById("yourCheckboxId").checked = result.checkboxSetting;
    }
  });
}

// 페이지가 로드될 때 설정 불러오기
document.addEventListener("DOMContentLoaded", function () {
  loadSettings();
  document.getElementById("yourCheckboxId").addEventListener("change", function () {
    saveSettings();
  });
});
