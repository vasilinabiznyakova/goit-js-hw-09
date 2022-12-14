// 1) napisat tajmer obratnogo otscheta
// 2) poluchit nachalnuju daty iz polja start date.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startDateEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
let intervalId = 0;
startBtnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtnEl.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function countTime() {
  intervalId = setInterval(() => {
    makeTimerOptionsInactive();
    updateTime();
  }, 1000);
}

startBtnEl.addEventListener('click', countTime);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function makeTimerOptionsInactive() {
  startDateEl.setAttribute('disabled', true);
  startBtnEl.setAttribute('disabled', true);
}

function updateTime() {
  const currentDate = new Date().getTime();
  const startDate = new Date(startDateEl.value).getTime();
  const difference = startDate - currentDate;

  const { days, hours, minutes, seconds } = convertMs(difference);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  if (difference <= 1000) {
    clearInterval(intervalId);
  }
}
