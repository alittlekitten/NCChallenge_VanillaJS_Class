// weather.js

const weather = document.querySelector(".js-weather");

const API_KEY = "c3001d6c36bfa343ca01e3a84d962b00"; // OpenWeatherMap에서 key를 가져와서 넣는다!
const COORDS = "coords";

function getWeather(lat,lng){ // API를 이용해 날씨를 받아오는 함수
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` // units=metric는 화씨를 섭씨로 바꾸기 위해서, fetch는 데이터를 가져올 때 사용!
    ).then(function(response){ // 데이터가 완전히 들어온 다음 함수를 호출하기 위해서 then을 사용!! api를 받아와서 response 안에 json에서 각각의 자료를 빼온다
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp; // 온도만 빼와서 temperature에 저장
        const place = json.name; // 장소만 빼와서 place에 저장
        weather.innerText = `${temperature}º @ ${place}`; // 온도와 지역 이름을 맨 위에서 가져온 weather의 text에 삽입
    }) // 데이터가 완전히 들어온 다음 함수를 호출하기 위해서 then을 사용!!
}

function saveCoords(coordsObj){ // 객체를 localStorage에 저장하는 함수
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // 객체를 string형태로 바꿔서 저장!
}

function handleGeoSucces(position){ // 잘 불러왔다면?
    const latitude = position.coords.latitude; // 위도를 latitude에 저장
    const longitude = position.coords.longitude; // 경도를 longitude에 저장
    const coordsObj = { // 객체의 변수 이름과 key의 이름을 같게 저장할 때는 : value를 생략해도 된다!
        latitude,
        longitude
    }; // coordsObj 객체에 위도와 경도를 저장
    saveCoords(coordsObj); // 객체를 저장하는 함수 실행
}

function handleGeoErro(){ // 못 불러왔다면?
    console.log('Can\'t access geolocation');
}

function askForCoords(){ // 현재 위치를 묻는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro); // 매개변수는 2개로, 앞은 잘 불러왔을 때, 뒤는 못 불러왔을 때 작동하는 함수이다.
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); // COORDS를 localStorage에서 가져온다
    if(loadedCoords === null){ // 만약 null이면
        askForCoords(); // 날씨를 묻는다
    } else{ // 날씨값이 있다면
        const parseCoords = JSON.parse(loadedCoords); // string을 다시 object형태로 바꿔줌
        getWeather(parseCoords.latitude, parseCoords.longitude); // parseCoords에서 받아온 위도와 경도를 사용하여 날씨를 구한다
    }
}

function init(){
    loadCoords();
}

init();