// ===============================
// ORGANISMS — большие блоки
// Header + AddTaskCard + TodoList
// ===============================

console.log("organism.js loaded");

import { BasicElm, TextElm, ButtonElm, FormElm } from "./atoms.js";
import { createFormGroup, createTodoList, createTodoItem, createCategoryPicker } from "./molecules.js";

// ----------------------------------------------------
// ORGANISM: Header
// ----------------------------------------------------
const createHeader = () => {
  const header = BasicElm("header", { className: "app-header" });

  const brand = TextElm("div", "YAKLIUBOV", { className: "app-header__brand" });
  const title = TextElm("h1", "Task Manager", { className: "app-header__title" });
  const subtitle = TextElm("p", "Manage your tasks effectively", { className: "app-header__subtitle" });

  header.append(brand, title, subtitle);
  return header;
};

// ----------------------------------------------------
// ORGANISM: Всё приложение
// ----------------------------------------------------
export const createTodoApp = (tasks) => {
  const container = BasicElm("div", { className: "app" });

  // ===== Header =====
  const header = createHeader();

  // ===== Card Add Task =====
  const formBox = BasicElm("section", { className: "todo-form" });

  // form: нужен для submit (Enter)
  const form = FormElm({ className: "todo-form__inner" });

  // label + input
  const { wrapper: formGroup, input } =
    createFormGroup("", "taskInput", "Enter a new task...");

  // кнопка +
  const addBtn = ButtonElm("+", {
    className: "btn btn--primary btn--addplus",
    type: "submit",
  });

  form.append(formGroup, addBtn);

  // выбор категории (ряд кружков)
  const categoryPicker = createCategoryPicker("work");

  // собираем карточку добавления
  formBox.append(form, categoryPicker);

  // ===== List =====
  const list = createTodoList(tasks);

  // ===== Add Event =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    // берём выбранную категорию из categoryPicker
    const selectedCategory = categoryPicker.dataset.selectedCategory || "work";

    const newTask = {
      title: value,
      completed: false,
      category: selectedCategory,
    };

    tasks.push(newTask);
    list.append(createTodoItem(newTask));

    input.value = "";
    input.focus();
  });

  // ===== Assemble =====
  container.append(header, formBox, list);

  return container;
};
