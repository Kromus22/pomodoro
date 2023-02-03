import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { showTodo, updateTodo } from "./todo.js";
import { addZero } from "./utils.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');
const title = document.title;

export const showTime = (seconds) => {
  minutesElem.textContent = addZero(Math.floor(seconds / 60));
  secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  const countdown = new Date().getTime() + state.timeLeft * 1000;

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    showTime(state.timeLeft);

    document.title = state.timeLeft;
    if (state.timeLeft > 0 && state.isActive) {
      return
    }

    document.title = title;

    //сонхронизация времени каждые 5 сек
    if (!(state.timeLeft % 5)) {
      const now = new Date().getTime();
      state.timeLeft = Math.floor((countdown - now) / 1000);
    }

    //время вышло. срабатывает аларм. и происходит проверка статуса, а так же увеличение счётчика помодоро
    //на их основе срабатывает логика обновления таймера на короткий перерыв или большой перерыв. 

    alarm();
    if (state.status === 'work') {
      state.activeTodo.pomodoro += 1;
      updateTodo(state.activeTodo);

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
    showTodo();
    startTimer();
  }, 1000);

}

