const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

const TIME_DELAY = 1000;
let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, TIME_DELAY);
}

function handleStopBtnClick() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

