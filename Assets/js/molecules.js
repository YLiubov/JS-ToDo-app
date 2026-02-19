// ==========================
// MOLECULES — собираем маленькие блоки из атомов
// Например: FormGroup, TodoItem
// ==========================

console.log("molecules.js loaded");

import { BasicElm, LabelElm, InputElm, ButtonElm, UlElm, LiElm, TextElm } from "./atoms.js";

// Молекула: FormGroup = label + input
export const createFormGroup = (labelText, inputId, placeholder) => {
  const wrapper = BasicElm("div", { className: "form-group" });

  const label = LabelElm(labelText, inputId, { className: "form-group__label" });
  const input = InputElm("text", {
    id: inputId,
    name: inputId,
    placeholder,
    className: "form-group__input",
  });

  wrapper.append(label, input);
  return { wrapper, input }; // возвращаем и wrapper и input, чтобы дальше можно было использовать input
};

// Молекула: TodoItem = checkbox + dot + text + delete button
export const createTodoItem = (task) => {
  const li = LiElm({ className: "todo-item" });

  if (task.completed) li.classList.add("todo-item--completed");

  const left = BasicElm("div", { className: "todo-item__left" });

  const checkbox = InputElm("checkbox", { className: "todo-item__check" });
  checkbox.checked = task.completed;

  // ✅ меняем стиль completed при клике
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    li.classList.toggle("todo-item--completed", task.completed);
  });

  const dot = BasicElm("span", { className: `todo-item__dot dot--${task.category}` });

  const text = TextElm("span", task.title, { className: "todo-item__text" });

  left.append(checkbox, dot, text);

  const delBtn = ButtonElm("Delete", { className: "btn btn--ghost btn--danger" });

  // ✅ удаляем задачу со страницы
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  li.append(left, delBtn);
  return li;
};


// Молекула: TodoList = ul + много TodoItem
export const createTodoList = (tasks) => {
  const ul = UlElm({ className: "todo-list" });

  for (const task of tasks) {
    ul.append(createTodoItem(task));
  }

  return ul;
};
