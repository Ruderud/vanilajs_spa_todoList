import $ from "../utils/elementSelector.js";
import Component from "../core/Component.js";

export class InputTodo extends Component {
  initialState() {
    this.state = {
      newTodo: "",
    };
  }

  setEvt() {
    this.addEvt("input", "form .inputTodo", (event) => {
      this.setState({
        newTodo: event.target.value,
      });
    });
  }

  HTMLtemplate() {
    const { selectedDay } = this.props;
    const { newTodo } = this.state;

    return `
    <div>
      <h3>${selectedDay} 할 일 추가</h3>
      <div>입력된 할 일: ${newTodo}<div>
      <form>
          <input class="inputTodo" type="text" value="${newTodo || ""}" /> 
          <button>추가하기</button>
      </form>
    </div>
    `;
  }
}
