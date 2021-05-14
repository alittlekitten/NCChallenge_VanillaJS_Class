const body = document.querySelector("body");

const IMG_NUMBER = 3; // 이미지는 총 3개!

function paintImage(imgNumber){
    const image = new Image(); // 이미지를 넣을 공간을 생성한다
    image.src = `images/${imgNumber+1}.jpg`; // src는 source의 약자로, 삽입하려는 그림의 위치를 나타낸다
    image.classList.add("bgImage"); // image에 bgImage라는 class를 넣는다 (css에서 배경으로 보내기 위해서)
    body.appendChild(image); // body에 image를 넣는다
}

function genRandom(){ // 랜덤한 수를 만들어내는 함수
    const number = Math.floor(Math.random() * IMG_NUMBER); // Math.random()은 0부터 1중 랜덤한 수를 뽑아옴, 거기다가 3을 곱하면 0부터 3중 랜덤한 수를 뽑고, floor를 쓰면 소숫점을 모두 날려버림!
    return number;
}

function init(){
    const randomNumber = genRandom(); // 랜덤한 숫자를 하나 만들어서
    paintImage(randomNumber); // 그 값을 이용해 이미지를 출력한다.
}

init();