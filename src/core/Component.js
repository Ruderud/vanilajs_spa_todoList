import $ from "../utils/elementSelector.js";

export default class Component {
  target;
  props;
  state;
  constructor(target, props) {
    console.log("Component constructor");
    this.target = target;
    this.props = props;
    this.initialState();
    this.setEvt();
    this.render();
  }

  //========= State Area
  initialState() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  //========= Service Fn Area
  setEvt() {}
  addEvt(evtType, selector, cbFn) {
    const childElements = [...this.target.querySelectorAll(selector)];
    const isEvtTarget = (evtTarget) =>
      childElements.includes(evtTarget) || evtTarget.closest(selector);

    console.log(
      "this.target.getAttribute('event')",
      this.target.getAttribute("event")
    );
    if (!this.target.getAttribute("event")) {
      this.target.addEventListener(evtType, (evt) => {
        if (!isEvtTarget(evt.target)) return false;
        cbFn(evt);
      });
      this.target.setAttribute("event", evtType);
    }
  }
  componentDidMount() {}

  //========= Render Area
  HTMLtemplate() {
    return ``;
  }

  render() {
    console.log(
      "=====",
      this.target?.className ||
        this.target?.id ||
        this.target?.tagName ||
        "텍스트",
      "render ====="
    );

    const newDom = document
      .createRange()
      .createContextualFragment(this.HTMLtemplate().trim());

    updateElement(this.target, newDom.firstChild, this.target.firstChild);
    this.componentDidMount(); //*
  }
}

function updateElement(parent, newNode, oldNode) {
  // console.log("parent", parent);
  // console.log("newNode", newNode);
  // console.log("oldNode", oldNode);
  if (!newNode && oldNode) {
    // console.log("old노드 존재하고 new노드 비어있음");
    return oldNode.remove();
  }
  if (newNode && !oldNode) {
    // console.log("old노드 비어있고 new노드만 존재");
    return parent.appendChild(newNode);
  }
  if (newNode instanceof Text && oldNode instanceof Text) {
    // console.log("둘다 텍스트노드");
    if (oldNode.nodeValue === newNode.nodeValue) {
      // console.log("근데 텍스트가 같음");
      return;
    }
    // console.log("텍스트가 다름");
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    // console.log("자식태그이름이 다름");
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  // console.log("자식태그이름이 같음", parent);
  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  // console.log("손자태그 비교들어감", parent, maxLength);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  for (const { name, value } of [...newNode.attributes]) {
    console.log("newNode", name, value);
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    console.log("oldNode", name, newNode.getAttribute(name));
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}
