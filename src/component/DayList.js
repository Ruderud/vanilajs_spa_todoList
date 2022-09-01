import $ from "../utils/elementSelector.js";
import Component from "../core/Component.js";

export const DAY_LIST = [
  {
    day: "yesterday",
    href: "#yesterday",
  },
  {
    day: "today",
    href: "#today",
  },
  {
    day: "tomorrow",
    href: "#tomorrow",
  },
];

export class DayList extends Component {
  //state
  initialState() {}
  //event
  setEvt() {
    const { handleTodoDay } = this.props;

    this.addEvt("click", "li a", (event) => {
      event.preventDefault();
      console.log(event.target.getAttribute("hre2f"));
      const targetDay = DAY_LIST.find(
        (dayElement) => dayElement.day === event.target.innerText
      );
      history.replaceState({}, "", targetDay.href);

      handleTodoDay(targetDay.day);
    });
  }
  //render
  HTMLtemplate() {
    const { selectedDay } = this.props;
    return `
        <ul>
            ${DAY_LIST.map((dayElement) => {
              return `<li style="background-color:${
                dayElement.day === selectedDay ? "green" : "none"
              }" class=${
                dayElement.day === selectedDay ? "selectedDay" : "unselectedDay"
              }><a href="${dayElement.href}">${dayElement.day}</a></li>`;
            }).join("")}
        </ul>
        `;
  }
}
