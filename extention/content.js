
function waiting(){
  const userElements = document.querySelectorAll('.sdp-review__article__list__info__user');
  userElements.forEach((userElement) => {
    const rectangleDiv = document.createElement('div');
    rectangleDiv.classList.add('warning');
    rectangleDiv.style.width = '200px';
    rectangleDiv.style.height = '40px';
    rectangleDiv.style.backgroundColor = '#FDEADA';
    rectangleDiv.style.marginLeft = '5px'; // Adjusted left margin for positioning
    rectangleDiv.style.borderRadius = '10px';
    rectangleDiv.style.display = 'flex'; // Use flexbox to center vertically
    rectangleDiv.style.alignItems = 'center'; // Center vertically
  
    // Center the elements with flexbox
    userElement.style.display = 'flex';
    userElement.style.alignItems = 'center';
    
    const imageElement2 = document.createElement('img'); // Create a new image element for the second image
    imageElement2.src = 'https://i.gifer.com/ZNeT.gif'; // New image for value 2
    imageElement2.style.width = '25px'; // Set width to 25px
    imageElement2.style.height = '25px'; // Set height to 25px
    imageElement2.style.marginRight = '15px'; // Adjusted margin for spacing
    imageElement2.style.marginLeft = '5px'; // Additional left margin for the new image
    imageElement2.style.display = 'block'; // Ensure block-level element behavior
    
  
    const textElement = document.createElement('div');
    textElement.style.fontFamily = 'Nanum Gothic';
    textElement.style.color = '#F79646'; // Font color F79646
    textElement.style.marginLeft = '5px'; // Adjusted margin for spacing
    textElement.style.fontSize = '14px'; // Slightly increased font size
    textElement.textContent = '리뷰 알바 판별 중 ...'; // Updated text for value 2
    userElement.appendChild(rectangleDiv);
    rectangleDiv.appendChild(imageElement2);
    rectangleDiv.appendChild(textElement);
  });
}

function applyStyles(targetElement, styleValue) {
  const rectangleDiv = document.createElement('div');
  rectangleDiv.classList.add('alba');
  rectangleDiv.style.width = '200px';
  rectangleDiv.style.height = '40px';
  rectangleDiv.style.backgroundColor = '#FDEADA';
  rectangleDiv.style.marginLeft = '5px'; // Adjusted left margin for positioning
  rectangleDiv.style.borderRadius = '10px';
  rectangleDiv.style.display = 'flex'; // Use flexbox to center vertically
  rectangleDiv.style.alignItems = 'center'; // Center vertically

  // Center the elements with flexbox
  targetElement.style.display = 'flex';
  targetElement.style.alignItems = 'center';

  const imageElement = document.createElement('img');
  imageElement.style.width = '20px';
  imageElement.style.height = '25px';
  imageElement.style.marginRight = '15px'; // Adjusted margin for spacing
  imageElement.style.marginLeft = '5px'; // Additional left margin for the image
  imageElement.style.display = 'block'; // Ensure block-level element behavior
  imageElement.src = 'https://raw.githubusercontent.com/festring/The_Scarlet_Letter/main/icon.png'; // Source for imageElement

  const textElement = document.createElement('div');
  textElement.style.fontFamily = 'Nanum Gothic';
  textElement.style.color = '#F79646'; // Font color F79646
  textElement.style.marginLeft = '5px'; // Adjusted margin for spacing
  textElement.style.fontSize = '14px'; // Slightly increased font size

  // Append the first image and text inside the rectangle
  rectangleDiv.appendChild(imageElement);
  rectangleDiv.appendChild(textElement);

  if (styleValue === 0) {
    // Do nothing for value 0
  } else if (styleValue === 1) {
    textElement.textContent = '리뷰 알바 의심계정입니다';
    targetElement.appendChild(rectangleDiv);
  } else {
    const imageElement2 = document.createElement('img'); // Create a new image element for the second image
    imageElement2.src = 'https://i.gifer.com/ZNeT.gif'; // New image for value 2
    imageElement2.style.width = '25px'; // Set width to 25px
    imageElement2.style.height = '25px'; // Set height to 25px
    imageElement2.style.marginRight = '15px'; // Adjusted margin for spacing
    imageElement2.style.marginLeft = '5px'; // Additional left margin for the new image
    imageElement2.style.display = 'block'; // Ensure block-level element behavior
    
    textElement.textContent = '리뷰 알바 판별 중 ...'; // Updated text for value 2

    // Replace imageElement with imageElement2
    rectangleDiv.replaceChild(imageElement2, imageElement);

    targetElement.appendChild(rectangleDiv);
  }
}



  
console.log('content.js 실행 완료');
// 대상 클래스명
console.log('Document Title:', document.title);
// 대상 클래스명
const targetClassName = 'sdp-review';

// 이전 memberIdArray 값을 저장할 변수
let prevMemberIdArray = [];

// MutationObserver 설정
const observer = new MutationObserver(() => {
  
  // 클래스가 추가되면 실행될 코드
  const userElements = document.querySelectorAll(`.${targetClassName} .sdp-review__article__list__info__user__name.js_reviewUserProfileImage`);
  const memberIdArray = [];
  
  userElements.forEach((userElement) => {
    const memberId = userElement.getAttribute('data-member-id');
    if (memberId) {
      memberIdArray.push(memberId);
    }
  });

  // 배열 출력
  //console.log(memberIdArray);
  
  // 이전 값과 비교하여 변화가 있을 경우 출력
  if (JSON.stringify(prevMemberIdArray) !== JSON.stringify(memberIdArray)) {
    console.log(memberIdArray);
    waiting();
    fetch('http://localhost:3000/memberIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberIds: memberIdArray }),
    })
    .then(response => response.json())
    .then(data => 
      // console.log(data);
      { 

        console.log('Success1:', data);
        if (data.responseData.length === 0) {
          data.responseData = [0,0,1,1,0];
        }
        console.log("ddddd",data.responseData);
        console.log("ddddd",data.responseData[0]);
        const dataArray = Array.from(data);

        const userElements = document.querySelectorAll('.sdp-review__article__list__info__user .js_reviewUserProfileImage');
        const stylesArray = dataArray;

        userElements.forEach((userElement, index) => {
          const styleValue = data.responseData[index];
          applyStyles(userElement, styleValue);
          delete_first();
        });
      })
    .catch((error) => console.error('Error:', error));
    // 이곳에 전송 코드 넣기
  }

  // 이전 값 갱신
  prevMemberIdArray = memberIdArray;
});

// 관찰할 대상 노드 설정 (문서 전체)
const targetNode = document.body;

// MutationObserver에 설정 적용
const observerConfig = {
  childList: true, // 자식 노드의 추가/제거 감지
  subtree: true, // 하위 노드 전체 감지
};

observer.observe(targetNode, observerConfig);

function delete_first() {
  const warningDivs = document.querySelectorAll('div.warning');

  // 찾은 각각의 div에 대해 반복하여 제거
  warningDivs.forEach((div) => {
      div.remove();
  });
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'startContentScript') {
    // 체크박스가 체크되었을 때 실행할 동작
    console.log('Content script started!');
    // 여기에 필요한 동작을 추가하세요.
    observer.observe(targetNode, observerConfig);
  } else if (request.action === 'stopContentScript') {
    // 체크박스가 체크 해제되었을 때 중지할 동작
    console.log('Content script stopped!');
    // 여기에 필요한 동작을 추가하세요.
    delete_first();
    observer.disconnect();
  }
});
