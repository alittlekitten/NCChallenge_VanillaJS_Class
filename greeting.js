const form = document.querySelector(".js-form"), // querySelector는 맨 처음꺼만, querySelectorAll은 모두 가져오는것! querySelectorAll는 array 형태로 가져온다는 특징도 있다!
    input = form.querySelector("input"); // form에서 input부분(입력창에 적은 내용) 가져온다!!
    greeting = document.querySelector(".js-greetings"); // js-greetings도 다시 가져온다!

const USER_LS = "currentUser", // UserLocalStorage에 들어갈 내용을 미리 넣어놓는다 (내용은 저장소 이름이라 크게 상관없음!)
    SHOWING_CN = "showing"; // Showing ClassName을 미리 showing으로 만들어놓고 이걸 추가하거나 뺌으로써 css를 적용하고 뺀다

function saveName(text){ // 저장을 위한 함수
    localStorage.setItem(USER_LS, text); // localStorage에 USER_LS라는 껍데기를 가진 text라는 데이터를 저장한다
}

function handleSubmit(event){ // 엔터를 눌렀을 때 값을 저장하고 출력하기 위해 만든 함수
    event.preventDefault(); // 엔터를 누를때 기본적으로 생기는 새로고침 현상을 막음
    const currentValue = input.value; // 값을 받아서
    paintGreeting(currentValue); // 입력창을 없애고 현재 입력된 이름을 출력
    saveName(currentValue); // 현재 값을 로컬스토리지에 저장
}

function askForName(){ // 이름을 묻는 함수
    form.classList.add(SHOWING_CN); // form에 showing이라는 class를 추가 (form창이 보임)
    form.addEventListener("submit", handleSubmit); // 엔터를 누르면 handleSubmit 함수가 실행
}

function paintGreeting(text){ // 입력창을 없애고 현재 입력된 이름을 출력(painting)하기 위한 함수
    form.classList.remove(SHOWING_CN); // form에 showing이라는 class를 삭제 (form창이 사라짐)
    greeting.classList.add(SHOWING_CN); // greeting에 showing이라는 class를 추가 (이름창이 보여짐)
    greeting.innerText = `Hello ${text}`; // Hello 사용자 로 greeting의 text 내용을 변경
}

function loadName(){ // 저장된 이름을 불러오거나, 값을 받는다.
    const currentUser = localStorage.getItem(USER_LS); // currentUser는 USER_LS(currentUser)에 저장된 값을 가져온 것!!
    if(currentUser === null){ // 만약 현재 이름이 저장되어있지 않으면 (저장되어 있지 않으면 null과 같다!!)
        askForName(); // 이름을 묻는다
    } else{ // 이름이 저장되어있다면
        paintGreeting(currentUser); // 그 이름을 불러온다
    }
}

function init(){ // 페이지가 작동되면 바로 loadName() 함수 실행!!
    loadName();
}

init();