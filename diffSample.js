function updateElement(parent, newNode, oldNode) {
  if (!newNode && oldNode) return oldNode.remove();
  if (newNode && !oldNode) return parent.appendChild(newNode);
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }
  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  for (const { name, value } of [...newNode.attributes]) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}

const oldState = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

const newState = [
  { id: 1, completed: true, content: "todo list item 1 update" },
  { id: 2, completed: true, content: "todo list item 2" },
  { id: 3, completed: false, content: "todo list item 3" },
];

const render = (state) => {
  const el = document.createElement("div");
  el.innerHTML = `
        <div id="app">
          <ul>
            ${state
              .map(
                ({ completed, content }) => `
              <li class="${completed ? "completed" : ""}">
                <input type="checkbox" class="toggle" ${
                  completed ? "checked" : ""
                } />
                ${content}
                <button class="remove">삭제</button>
              </li>
            `
              )
              .join("")}
          </ul>
          <form>
            <input type="text" />
            <button type="submit"  >추가</button>
          </form>
        </div>
      `.trim();

  return el.firstChild;
};

const oldNode = render(oldState);
const newNode = render(newState);

const $root = document.createElement("div");

document.body.appendChild($root);
updateElement($root, oldNode);
setTimeout(() => updateElement($root, newNode, oldNode), 1000); // 1초 뒤에 DOM 변경
