import { initControl } from "./control.js";
import { state } from "./state.js";

const init = () => {
  initControl();

  state.activeTodo = {
    id: 'default',
    pomodoro: 0,
    title: '',
  }
}

init();