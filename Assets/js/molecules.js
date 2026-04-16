// ===============================
// MOLECULES
// Составные элементы из атомов
// ===============================

console.log("molecules.js loaded");

import {
  BasicElm,
  TextElm,
  InputElm,
  LabelElm,
  ButtonElm,
  UlElm,
  LiElm,
  ImgElm
} from "./atoms.js";


// ======================================================
// FormGroup (label + input)
// ======================================================
export const createFormGroup = (labelText, inputId, placeholder) => {

  const wrapper = BasicElm("div", { className: "form-group" });

  const input = InputElm("text", {
    id: inputId,
    name: inputId,
    placeholder,
    className: "form-group__input",
  });

  // если label не пустой — создаём его
  if (labelText && labelText.trim() !== "") {
    const label = LabelElm(labelText, inputId, {
      className: "form-group__label"
    });
    wrapper.append(label);
  }

  wrapper.append(input);

  return { wrapper, input };
};


// ======================================================
// Category Picker (строка Category + кружки)
// ======================================================
export const createCategoryPicker = (selected = "work") => {

  const row = BasicElm("div", { className: "category-row" });

  const label = TextElm("div", "Category:", {
    className: "category-row__label"
  });

  const dotsWrap = BasicElm("div", { className: "category-dots" });

  const categories = ["work", "personal", "important", "shopping", "health"];

  for (const c of categories) {

    const dot = BasicElm("span", {
      className: `cat-dot dot--${c}`
    });

    // подсветка выбранного
    if (c === selected) dot.classList.add("is-active");

    dot.addEventListener("click", () => {

      dotsWrap.querySelectorAll(".cat-dot")
        .forEach(d => d.classList.remove("is-active"));

      dot.classList.add("is-active");

      // сохраняем выбранную категорию
      row.dataset.selectedCategory = c;
    });

    dotsWrap.append(dot);
  }

  row.dataset.selectedCategory = selected;

  row.append(label, dotsWrap);

  return row;
};


// ======================================================
// TodoItem (одна задача)
// ======================================================
export const createTodoItem = (task) => {

  const li = LiElm({ className: "todo-item" });

  // класс по категории (для цветной рамки)
  li.classList.add(`todo-item--${task.category}`);

  if (task.completed) {
    li.classList.add("todo-item--completed");
  }

  // ===== ЛЕВАЯ ЧАСТЬ =====
  const left = BasicElm("div", { className: "todo-item__left" });

  const checkbox = InputElm("checkbox", {
    className: "todo-item__check"
  });

  checkbox.checked = task.completed;

  // смена completed
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    li.classList.toggle("todo-item--completed", task.completed);
  });

  const text = TextElm("span", task.title, {
    className: "todo-item__text"
  });

  left.append(checkbox, text);


  // ===== ПРАВАЯ ЧАСТЬ =====
  const right = BasicElm("div", {
    className: "todo-item__right"
  });

  // точка категории
  const dot = BasicElm("span", {
    className: `todo-item__dot dot--${task.category}`
  });

  // кнопка удаления
  const delBtn = ButtonElm("", {
    className: "btn btn--ghost btn--icon btn--danger"
  });

  // SVG из папки
  const trashIcon = ImgElm(
    "./Assets/image/icon/trash.svg",
    "Delete task",
    { className: "trash_icon" }
  );

  delBtn.append(trashIcon);

  delBtn.addEventListener("click", () => {
    li.remove();
  });

  right.append(dot, delBtn);

  li.append(left, right);

  return li;
};


// ======================================================
// TodoList (ul + список задач)
// ======================================================
export const createTodoList = (tasks) => {

  const ul = UlElm({ className: "todo-list" });

  for (const task of tasks) {
    ul.append(createTodoItem(task));
  }

  return ul;
};
