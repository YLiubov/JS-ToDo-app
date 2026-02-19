// ==========================
// ORGANISMS — большие блоки
// Здесь собираем приложение: заголовок + форма + список
// ==========================

console.log("organism.js loaded");

import { BasicElm, TextElm, ButtonElm, FormElm } from "./atoms.js";
import { createFormGroup, createTodoList } from "./molecules.js";

export const createTodoApp = (tasks) => {
  const container = BasicElm("div", { className: "app" });

  // Заголовок приложения
  const title = TextElm("h1", "To-Do List", { className: "app__title" });

  // ===== ФОРМА =====
  const formBox = BasicElm("div", { className: "todo-form" });
  const form = FormElm({ className: "todo-form__inner" });

  // FormGroup (label + input)
  const { wrapper: formGroup, input } = createFormGroup("Task", "taskInput", "Enter task...");

  // Кнопка Add (без логики добавления, но можно сделать позже)
  const addBtn = ButtonElm("Add", { className: "btn btn--primary" });

  form.append(formGroup, addBtn);
  formBox.append(form);

  // ===== СПИСОК =====
  const list = createTodoList(tasks);

  // Собираем всё
  container.append(title, formBox, list);

  return container;
};
