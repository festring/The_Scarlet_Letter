document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('yourCheckboxId');

  checkbox.addEventListener('change', function () {
    const isChecked = checkbox.checked;
    chrome.runtime.sendMessage({ action: 'updateCheckboxStatus', isChecked });
  });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.warningCount !== undefined) {
      const warningCountElement = document.getElementById('warningCount');
      warningCountElement.textContent = `의심 계정: ${message.warningCount}개`;
  }
});





chrome.runtime.connect({ name: 'popup' });
