import $ from "../utils/elementSelector.js";
import Component from "../core/Component.js";

const TODO_LIST = [
  {
    day: "어제",
    todoList: ["밥먹기"],
  },
  {
    day: "오늘",
    todoList: ["코딩하기", "커밋하기"],
  },
  {
    day: "내일",
    todoList: ["배포하기", "버그수정하기", "재배포하기"],
  },
];

export class TodoList extends Component {
  initialState() {
    this.state = {
      todoList: {
        yesterday: [{ todo: "밥먹기", done: false }],
        today: [
          { todo: "코딩하기", done: false },
          { todo: "커밋하기", done: false },
        ],
        tomorrow: [
          { todo: "배포하기", done: false },
          { todo: "버그수정하기", done: false },
          { todo: "재배포하기", done: false },
        ],
      },
    };
  }

  setEvt() {
    const { todoList } = this.state;
    const { selectedDay } = this.props;
    this.addEvt("click", "ol li button", (event) => {
      const targetTodoList = this.getTargetTodoList(selectedDay).map((ele) => {
        if (ele.todo === event.path[1].getAttribute("key")) {
          return {
            ...ele,
            done: !ele.done,
          };
        }
        return ele;
      });
      this.setState({
        todoList: {
          ...todoList,
          [selectedDay]: targetTodoList,
        },
      });
    });
  }

  getTargetTodoList(selectedDay) {
    const { todoList } = this.state;
    return todoList[selectedDay];
  }

  HTMLtemplate() {
    const { todoList } = this.state;
    const { selectedDay } = this.props;

    return `
    <ol>
        ${this.getTargetTodoList(selectedDay)
          .map((ele, index) => {
            return `<li class="${ele.done ? "finish" : "not-finish"}" key="${
              ele.todo
            }">${ele.todo}<button>${ele.done ? "취소" : "완료"}</button></li>`;
          })
          .join("")}
    </ol>
        `;
  }
}
