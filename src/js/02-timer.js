// Import "Flatpickr" and "Notiflix".
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Object-links to elements of the HTML document.
const refs = {
  dateInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

// Flatpickr options.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose([selectedDates]) {

    if (isDateCorrect(selectedDates)) {
        Notify.failure('Please choose a date in the future');
    }

    refs.startBtn.disabled = isDateCorrect(selectedDates);
  },
};

// Date check for "Flatpickr options".
function isDateCorrect(selectedDates) {
    return selectedDates < Date.now();
};

// Initial blocking of the "Start" button.
refs.startBtn.disabled = true;

// Initialization "Flatpickr" on the input field.
let calendar = flatpickr(refs.dateInput, options);

// Сreate a timer class
class Timer {
  constructor({ updateTimerFace }) {
    this.intervalId = null;
    this.isActiv = false;
    this.updateTimerFace = updateTimerFace;
  }

  start() {
    if (this.isActiv) {
      Notify.info('Timer already started');
      return;
    }

    this.isActiv = true;

    const finishTime = calendar.selectedDates[0];

    this.intervalId = setInterval(() => {
      const timeForEnd = finishTime - Date.now();

      const time = this.convertMs(timeForEnd);
      this.updateTimerFace(time);

      if (timeForEnd <= 0) {
        this.stop();
        Notify.info('Timer is over');
      }
    }, 1000);
  }

  stop() {
    if (!this.isActiv) {
      Notify.info('Timer already stopped');
      return;
    }

    this.isActiv = false;
    clearInterval(this.intervalId);

    const time = this.convertMs(0);
    this.updateTimerFace(time);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }
}

// Initial new timer.
const timer = new Timer({
  updateTimerFace,
});

// Update value on screen
function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = addLeadingZero(days);
  refs.hoursField.textContent = addLeadingZero(hours);
  refs.minutesField.textContent = addLeadingZero(minutes);
  refs.secondsField.textContent = addLeadingZero(seconds);
}

// Added "0".
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Listnen click on start button.
refs.startBtn.addEventListener('click', handleStartBtnClick);

// Start timer.
function handleStartBtnClick() {
  timer.start();
}