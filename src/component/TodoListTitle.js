import $ from "../utils/elementSelector.js";
import Component from "../core/Component.js";

export class TodoListTitle extends Component {
  HTMLtemplate() {
    const { selectedDay } = this.props;

    return `
            <h3>${selectedDay} 할 일</h3>
        `;
  }
}
