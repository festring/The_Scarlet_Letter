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

// MutationObserver 시작
observer.observe(targetNode, observerConfig);