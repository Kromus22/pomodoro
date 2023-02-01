import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { addZero } from "./utils.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
  minutesElem.textContent = addZero(Math.floor(seconds / 60));
  secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  state.timeLeft -= 1;

  showTime(state.timeLeft)

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  //время вышло. срабатывает аларм. и происходит проверка статуса, а так же увеличение счётчика помодоро
  //на их основе срабатывает логика обновления таймера на короткий перерыв или большой перерыв. 
  if (state.timeLeft <= 0) {
    alarm();
    if (state.status === 'work') {
      state.activeTodo.pomodoro += 1;

      if (state.activeTodo.pomodoro % state.count) {
        state.status = 'break';
      } else {
        state.status = 'relax';
      }

    } else {
      state.status = 'work';
    }

    state.timeLeft = state[state.status] * 60;
    changeActiveBtn(state.status);
    startTimer();
  }
}