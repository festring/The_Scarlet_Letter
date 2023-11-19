function applyStyles(userElement, styleValue) {
    if (styleValue === 1) {
      const rectangleDiv = document.createElement('div');
      rectangleDiv.style.width = '20px';
      rectangleDiv.style.height = '20px';
      rectangleDiv.style.backgroundColor = 'red';
      rectangleDiv.style.marginLeft = '5px';
      
      userElement.style.display = 'flex';
      rectangleDiv.style.display = 'inline-block';
      
      userElement.appendChild(rectangleDiv);
    } else if (styleValue === 2) {
      const rectangleDiv = document.createElement('div');
      rectangleDiv.style.width = '20px';
      rectangleDiv.style.height = '20px';
      rectangleDiv.style.backgroundColor = 'green';
      rectangleDiv.style.marginLeft = '5px';
      
      userElement.style.display = 'flex';
      rectangleDiv.style.display = 'inline-block';
      
      userElement.appendChild(rectangleDiv);
    }
    // If styleValue is 0, do nothing for that element (no rectangle).
  }
  
  const userElements = document.querySelectorAll('.sdp-review__article__list__info__user .js_reviewUserProfileImage');
  const stylesArray = [0, 1, 1, 2, 1];
  
  userElements.forEach((userElement, index) => {
    const styleValue = stylesArray[index];
    applyStyles(userElement, styleValue);
  });