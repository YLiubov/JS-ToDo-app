// ==========================
// ORGANISMS — большие блоки
// Здесь собираем приложение: заголовок + форма + список
// ==========================

console.log("organism.js loaded");

import { BasicElm, TextElm, ButtonElm, FormElm } from "./atoms.js";
import { createFormGroup, createTodoList, createTodoItem } from "./molecules.js";

export const createTodoApp = (tasks) => {
  const container = BasicElm("div", { className: "app" });

  // Заголовок
  const title = TextElm("h1", "To-Do List", { className: "app__title" });

  // ===== ФОРМА (ввод новой задачи) =====
  const formBox = BasicElm("div", { className: "todo-form" });

  // form (нужен, чтобы работал Enter)
  const form = FormElm({ className: "todo-form__inner" });

  // FormGroup возвращает wrapper + input
  const { wrapper: formGroup, input } = createFormGroup("Task", "taskInput", "Enter task...");

  // кнопка Add
  const addBtn = ButtonElm("Add", { className: "btn btn--primary", type: "submit" });
  // type submit: тогда Enter в инпуте тоже сработает через submit

  form.append(formGroup, addBtn);
  formBox.append(form);

  // ===== СПИСОК =====
  const list = createTodoList(tasks); // это <ul> с существующими задачами

  // ✅ ЛОГИКА ДОБАВЛЕНИЯ (event)
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась

    const value = input.value.trim(); // берём текст, убираем пробелы
    if (!value) return; // если пусто — ничего не делаем

    // создаём новую задачу (минимальная структура)
    const newTask = {
      title: value,
      completed: false,
      category: "work" // можно поменять на любую дефолтную категорию
    };

    // добавляем в массив задач (чтобы данные тоже обновлялись)
    tasks.push(newTask);

    // создаём <li> через молекулу и добавляем в <ul>
    list.append(createTodoItem(newTask));

    // очищаем input
    input.value = "";
    input.focus();
  });

  container.append(title, formBox, list);
  return container;
};
