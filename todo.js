// todo.js

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; // LocalStorage에 toDos라는 저장소를 만든다!
let toDos = []; // 할 일을 모아놓은 배열(array) - toDos는 계속해서 변하기 때문에 const가 아닌 let으로 만들어야한다!!


function deleteToDo(event){ // localStorage에서 요소를 지우기 위한 함수
    // TMI : 요소의 부모를 알기 위해서는 console.dir()!
    const btn = event.target; // 이벤트가 일어난 장소를 알려주는 .target!!
    const li = btn.parentNode; // btn의 부모노드를 li에 저장
    toDoList.removeChild(li); // toDoList에서 li라는 요소를 가진 친구를 지운다!
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // toDo.id와 li.id를 비교해서 다른것만 toDos에 저장!!
        // parseInt는 string을 int로 바꿔주기 위함! li.id는 string이기 때문에 정확한 비교를 위해서는 int 형태로 바꿔줘야한다.
    });
    // filter는 배열 내 각 요소에 대해 매개변수로 들어간 함수에 대해 true를 반환하는 모든 값이 있는 새로운 배열을 반환한다!
    toDos = cleanToDos // 삭제해야할 요소를 지우고 새롭게 만든 배열을 다시 toDos에 할당!!
    saveToDos(); // 삭제 작업을 마쳤으니 이제 localStorage에 새로 바꾼 내용을 저장!
}


function saveToDos(){ // localStorage에 요소를 저장하기 위한 함수
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage에 저장! 자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다는 점을 꼭 생각하자!! 그렇기에 object를 string으로 바꿔서 저장한다.
    // JSON.stringify는 자바스크립트 object를 string으로 바꿔준다! 이거의 반대는 parse()!! 
    // JSON은 JavaScript Object Notation의 준말! 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있또록 object로 바꿔주는 기능!!
}


function paintToDo(text){ // 화면에 할 일을 출력하는 함수
    const li = document.createElement("li"); // 비어있는 li를 하나 만든다
    const delBtn = document.createElement("button"); // 버튼을 하나 만든다
    const span = document.createElement("span"); // span(공간)을 하나 만든다
    const newId = toDos.length + 1; // li와 밑에 만든 toDoObj객체에 id값을 부여하기 위해!
    delBtn.innerHTML = "❌" // https://kr.piliapp.com/emoji/list/ 여기서 이모티콘 가져옴!!
    // innerHTML은 element 안의 HTML이나 XML을 가져오고, innerTEXT는 text값만을 가져온다.
    // 이건 직접 가져와서 html코드를 입력해보면, innerText는 코드가 그대로 출력되지만 innerHTML은 html이 적용되어서 출력된다!!
    delBtn.addEventListener("click", deleteToDo); // delBtn을 누르면 deleteToDo 함수가 실행!!
    span.innerText = text; // span에는 받아온 text를 넣는다
    li.appendChild(delBtn); // 만든 li에 delBtn(X표시)를 넣는다
    li.appendChild(span); // 만든 li에 span(입력창에 적혀있던 text를 바로 위 innerText에서 넣었다!!)을 넣는다
    li.id = newId; // li에도 id를 부여
    toDoList.appendChild(li); // 만든 li를 toDoList(3번 라인에서 .jstoDoList에서 가져온 그거 맞다!)에 넣는다

    const toDoObj = { // 객체를 하나 만들어서 toDos에 저장
        text: text, // text는 그대로 text
        id: toDos.length + 1 // id는 현재 toDos의 길이 + 1 (이러면 id값이 1부터 들어가게 된다!)
    };
    toDos.push(toDoObj); // array에 PUSH하기!
    saveToDos(); // localStorage에 저장하기!! 반드시 push 이후에 해야 정상적으로 저장된다!
}


function handleSubmit(event){ // 엔터키가 눌리면 작동되는 함수
    event.preventDefault(); // 기본 동작(새로고침)을 없애주는 함수 - event를 사용하기 때문에 handleSubmit의 매개변수로 event를 받아와서 사용한다
    const currentValue = toDoInput.value; // 작성된 값을 받아온다
    paintToDo(currentValue); // 그 값을 화면에 출력한다
    toDoInput.value = ""; // 엔터키를 누르고 나면 작성창 안을 비운다
}


function loadToDos(){ // 해야할 일을 띄우는 함수
    const loadedToDos = localStorage.getItem(TODOS_LS); // localStorage에서 TODOS_LS에 있는 값을 가져온다 (이게 할 일)
    if(loadedToDos !== null){ // 할 게 있다면
        const parsedToDos = JSON.parse(loadedToDos); // string을 object로 변환하는 parse!
        // 모든 parsedToDos 안의 요소들을 paintToDo를 통해 출력해줘야한다
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        // forEach는 array에 담겨있는 것들에 대해 각각 한번씩 함수를 실행시킨다! 안에 파라미터값으로 함수가 들어간다!! 안에서 함수를 만들어서 사용하였다.
        // parsedToDos 안의 요소들이 하나하나씩 toDo 자리에 들어가게 되고, 그 요소들 안에 들어있는 text가 paintToDo의 매개변수가 된다.
    } 
}


function init(){
    loadToDos(); // 해야할 일을 불러온다!
    toDoForm.addEventListener("submit", handleSubmit); // 할 일 form에 무언가가 제출되면 handleSubmit 함수를 작동
}

init();