let isCheckboxChecked = false;
let port;

chrome.runtime.onInstalled.addListener(function () {
  // 확장 프로그램 설치 또는 업데이트 시 초기화 작업 수행
  chrome.storage.sync.get(['isChecked'], function(result) {
    // 저장된 체크박스 상태를 가져와서 업데이트
    isCheckboxChecked = result.isChecked === undefined ? true : result.isChecked;
    
    // 체크박스 상태에 따라 컨텐트 스크립트에 메시지 전송
    const activeTabsQuery = { active: true, currentWindow: true };

    chrome.tabs.query(activeTabsQuery, function (tabs) {
      const tabId = tabs[0]?.id;

      if (tabId !== undefined) {
        if (isCheckboxChecked) {
          chrome.tabs.sendMessage(tabId, { action: 'startContentScript' });
        } else {
          chrome.tabs.sendMessage(tabId, { action: 'stopContentScript' });
        }
      }
    });
  });
});

chrome.runtime.onConnect.addListener(function (externalPort) {
  if (externalPort.name === 'popup') {
    port = externalPort;
    port.onDisconnect.addListener(function () {
      port = null;
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateCheckboxStatus') {
    isCheckboxChecked = request.isChecked;

    const activeTabsQuery = { active: true, currentWindow: true };

    chrome.tabs.query(activeTabsQuery, function (tabs) {
      const tabId = tabs[0]?.id;

      if (tabId !== undefined) {
        if (isCheckboxChecked) {
          chrome.tabs.sendMessage(tabId, { action: 'startContentScript' });
        } else {
          chrome.tabs.sendMessage(tabId, { action: 'stopContentScript' });
        }
      }
    });

    // 체크박스 상태를 저장
    chrome.storage.sync.set({ isChecked: isCheckboxChecked });
  }
});
