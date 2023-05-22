const container = document.querySelector('#container');
const gameArea = document.querySelector('#gameArea');
const endPlay = document.querySelector('#endPlay');
const gameBtn = document.querySelectorAll('.gameBtn');
const countDown = document.querySelector('.countDown');
const countUp = document.querySelector('.countUp');
// 트리 생성
const tree = document.querySelector('#tree');
let endGameClear;
// 게임 모드를 선택 할 수 있도록 배열의 길이를 구하기 위해 for문 사용
for (let i = 0; i < gameBtn.length; i++) {
  // 버튼에 클릭 이벤트
  gameBtn[i].addEventListener('click', function () {
    container.style.display = 'none';
    // 내가 클릭한 버튼의 innerText가 @@@ 일 떄
    if (this.innerText === 'HARD') {
      //===========hard============//
      countUp.innerText = '플레이시간 : 0 초';
      countDown.innerText = '남은시간 : 60 초';
      gameTimer(60);
      createTree(9, 'hardTree');

      // 틀을 만든 이유는 css로 nth-child로 위치를 잡아줬기 때문에
      // 이미지의 src 속성을 줬다가 삭제해줬다가 이런식으로 할 예정
      //=========사과가 생성될 틀===========//
      const hardTree = document.querySelectorAll('.hardTree');
      hardTree.forEach(hardTree => {
        for (let j = 0; j < 5; j++) {
          const objDiv = document.createElement('div');
          objDiv.setAttribute('class', 'appleDiv');
          hardTree.appendChild(objDiv);
        }
      });
      const appleDiv = document.querySelectorAll('.appleDiv');
      appleDiv.forEach(appleDivs => {
        const objImg = document.createElement('img');
        appleDivs.appendChild(objImg);
        objImg.setAttribute('class', 'appleIMG');
      });

      endGameClear = setInterval(createApple, 2000);
      harvestApple();
      setInterval(countFiledApple, 100);
    } else if (this.innerText === 'NORMAL') {
      //===========normal============//
      countUp.innerText = '플레이시간 : 0 초';
      countDown.innerText = '남은시간 : 45 초';
      gameTimer(45);
      createTree(6, 'normalTree');

      //=========사과가 생성될 틀===========//
      const normalTree = document.querySelectorAll('.normalTree');
      normalTree.forEach(normalTree => {
        for (let j = 0; j < 5; j++) {
          const objDiv = document.createElement('div');
          objDiv.setAttribute('class', 'appleDiv');
          normalTree.appendChild(objDiv);
        }
      });
      const appleDiv = document.querySelectorAll('.appleDiv');
      appleDiv.forEach(appleDivs => {
        const objImg = document.createElement('img');
        appleDivs.appendChild(objImg);
        objImg.setAttribute('class', 'appleIMG');
      });

      endGameClear = setInterval(createApple, 3000);
      harvestApple();
      setInterval(countFiledApple, 100);
    } else {
      //===========easy============//
      countUp.innerText = '플레이시간 : 0 초';
      countDown.innerText = '남은시간 : 30 초';
      gameTimer(30);
      createTree(3, 'easyTree');

      //=========사과가 생성될 틀===========//
      const easyTree = document.querySelectorAll('.easyTree');
      easyTree.forEach(easyTree => {
        for (let j = 0; j < 5; j++) {
          const objDiv = document.createElement('div');
          objDiv.setAttribute('class', 'appleDiv');
          easyTree.appendChild(objDiv);
        }
      });
      const appleDiv = document.querySelectorAll('.appleDiv');
      appleDiv.forEach(appleDivs => {
        const objImg = document.createElement('img');
        appleDivs.appendChild(objImg);
        objImg.setAttribute('class', 'appleIMG');
      });

      endGameClear = setInterval(createApple, 5000);
      harvestApple();
      setInterval(countFiledApple, 100);
    }
  });
}

// 트리 생성
function createTree(treeNum, treeClass) {
  for (let i = 0; i < treeNum; i++) {
    const objDiv = document.createElement('div');
    tree.appendChild(objDiv);
    const objTree = document.createElement('img');
    objTree.setAttribute('src', 'img/나무.png');
    objDiv.setAttribute('class', treeClass);
    objTree.setAttribute('style', '-webkit-user-drag: none');
    objDiv.appendChild(objTree);
  }
}

// 사과 생성
function createApple() {
  // 각 모드마다 트리(nodes)
  const trees = tree.childNodes;
  const numTrees = trees.length;
  // 랜덤 2~3 숫자
  const numApples = Math.floor(Math.random() * 2) + 2;
  // console.log(numApples); // 2 또는 3

  // 빈 배열 생성하고
  const randomIndexes = [];
  // 배열의 길이보다 2,3 숫자보다 작으면 반복
  // for문으로 사용하려면 for(; randomIndexes.length < numApples) 조건문만 되도록 ; 써줘야함
  while (randomIndexes.length < numApples) {
    // 트리의 갯수중 랜덤 숫자 즉 각 모드의 트리 갯수가 최댓값
    const randomIndex = Math.floor(Math.random() * numTrees);
    // includes를 사용한 이유는 한 사과나무에 중복되게 열리지 않게 하기 위해
    // 배열 안에 randomIndex 가 없다면
    if (!randomIndexes.includes(randomIndex)) {
      // 배열에 randomIndex를 넣어라
      randomIndexes.push(randomIndex);
    }
  }
  // forEach는 배열에서 사용하는 반복문
  randomIndexes.forEach(random => {
    const currentCreateApple = trees[random];
    // 생성될 이미지의 부모
    const currentAppleDiv = currentCreateApple.querySelectorAll('.appleDiv img');
    // 0부터 4까지 랜덤한 숫자
    const appleRandomIndex = Math.floor(Math.random() * 5);
    for (let i = 0; i < currentAppleDiv.length; i++) {
      if (currentAppleDiv[appleRandomIndex].getAttribute('src') === 'img/사과.png') {
      }
      currentAppleDiv[appleRandomIndex].setAttribute('src', 'img/사과.png');
    }
  });
}

// 수확한 사과 카운트
function harvestApple() {
  const countApple = document.querySelector('.countApple');
  let countAppleNum = 0;
  const appleIMG = document.querySelectorAll('.appleIMG');
  countApple.innerText = `수확한 사과 수 : 0 개`;
  appleIMG.forEach(appleIMG => {
    appleIMG.addEventListener('click', () => {
      appleIMG.removeAttribute('src', 'img/사과.png');
      countAppleNum++;
      countApple.innerText = `수확한 사과 수 : ${countAppleNum} 개`;
    });
  });
}

function countFiledApple() {
  // 필드에 있는 사과를 넣을 빈 배열
  let filedApple = [];
  const treeApple = document.querySelector('.treeApple');
  const appleIMG = document.querySelectorAll('.appleIMG');

  appleIMG.forEach(appleIMG => {
    // 속성이 저거 일 떄 빈 배열에 넣어라
    if (appleIMG.getAttribute('src', 'img/사과.png')) {
      filedApple.push(appleIMG);
    }
  });
  let filedAppleL = filedApple.length;
  treeApple.innerText = `나무에 열린 사과 수 : ${filedAppleL} 개`;
}
// 게임 모드마다 타이머
// time을 인자로 넘겨 사용성을 높힘
function gameTimer(time) {
  let countUpSeconds = 0;
  let seconds = time;
  // 입력받은 초를 1초마다 카운트 다운
  let countdown = setInterval(function () {
    // 1씩 줄어들기
    seconds--;
    // 1씩 늘어나기
    countUpSeconds++;
    countDown.innerText = `남은시간 : ${seconds} 초`;
    countUp.innerText = `플레이시간 : ${countUpSeconds} 초`;
    // 초가 0이 됐을 때 카운트 다운 멈추기 clearInterval
    if (seconds === 0) {
      clearInterval(countdown);

      clearInterval(endGameClear);

      //카운트업 값을 넘겨주기
      gameEnd(countUpSeconds);
    }
  }, 1000);
}

// 게임 끝났을 때 화면
function gameEnd(countUpSeconds) {
  gameArea.style.display = 'none';
  endPlay.style.display = 'flex';

  //결과화면 플레이시간 나타내기
  const objP = document.createElement('p');
  endPlay.appendChild(objP);
  objP.setAttribute('class', 'endGameSeconds');
  const endGameSeconds = document.querySelector('.endGameSeconds');
  endGameSeconds.innerText = `플레이 시간 : ${countUpSeconds} 초`;

  const countApple = document.querySelector('.countApple ');
  const treeApple = document.querySelector('.treeApple ');

  const objp1 = document.createElement('p');
  endPlay.appendChild(objp1);
  objp1.innerText = countApple.innerText;

  const objp2 = document.createElement('p');
  endPlay.appendChild(objp2);
  objp2.innerText = treeApple.innerText;

  //결과화면 재시작 버튼
  const objBtn = document.createElement('button');
  endPlay.appendChild(objBtn);
  objBtn.setAttribute('onclick', 'restartBtn()');
  objBtn.setAttribute('class', 'restartBtn');
  const restartBtn = document.querySelector('.restartBtn');
  restartBtn.innerText = '재시작';
}

// 재시작 버튼
function restartBtn() {
  window.location.reload();
}
