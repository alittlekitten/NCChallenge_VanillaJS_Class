const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date(); // Date는 class!! (객체라고 생각) - 시간을 가져오기 위함
    // 가져온 시간에서 시, 분, 초를 빼내옴
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // 삼항연산자를 사용해서 0을 넣음
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`; // 그 값들을 이용해서 clockTitle에다가   Text를 박아버림!!
}

function init(){
    getTime();
    setInterval(getTime, 1000); // 시간 간격을 정함, 호출할 함수 / milliseconds 순
}

init();