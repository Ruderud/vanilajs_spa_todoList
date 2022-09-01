import $ from "./utils/elementSelector.js";
import Component from "./core/Component.js";

import {
  DayList,
  TodoListTitle,
  TodoList,
  DAY_LIST,
  InputTodo,
} from "./component/index.js";

export default class App extends Component {
  //========= State Area
  initialState() {
    const dayinit = DAY_LIST.find(
      (dayElement) =>
        dayElement.href.split("#")[1].toString() ===
        window.location.href.split("#")[1]?.toString()
    );

    this.state = {
      selectedDay: dayinit !== undefined ? dayinit.day : "today",
    };
  }

  //========= Service Fn Area

  componentDidMount() {
    const { handleTodoDay } = this;
    const { selectedDay } = this.state;

    new DayList($(".dayList"), {
      selectedDay,
      handleTodoDay: handleTodoDay.bind(this),
    });
    new TodoListTitle($(".todoListContainer .title"), { selectedDay });
    new TodoList($(".todoListContainer .todoList"), { selectedDay });

    new InputTodo($(".inputTodoContainer"), { selectedDay });
    console.log("************랜더끝**********************");
  }

  handleTodoDay(selectedDay) {
    this.setState({
      selectedDay,
    });
  }

  setEvt() {
    this.addEvt("click", ".stateCheck", () => {
      console.log(this.state);
    });
  }

  //========= Render Area
  HTMLtemplate() {
    return `
    <div>
          <h1>TodoList</h1>
          <button class="stateCheck">state확인버튼</button>
          <div class="dayList"></div>
          
          <hr></hr>
          <div class="todoListContainer">
            <div class="title"></div>
            <div class="todoList"></div>
          </div>
          <hr></hr>
          <div class="inputTodoContainer"></div>
    </div>
          `;
  }
}
