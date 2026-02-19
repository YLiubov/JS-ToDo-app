// ==========================
// MAIN — только вставляет организм (TodoApp) в DOM
// ==========================

console.log("main.js loaded");

import { createTodoApp } from "./organism.js";

// Берём контейнер из HTML
const root = document.getElementById("root");
root.innerHTML = "";

// Захардкоженные данные (по заданию)
const tasks = [
  { title: "Create application flowchart", completed: false, category: "work" },
  { title: "Design user interface", completed: true, category: "personal" },
  { title: "Implement add task functionality", completed: false, category: "important" },
  { title: "Add task filters", completed: false, category: "shopping" },
  { title: "Test the application", completed: false, category: "health" },
];

// Создаём приложение и вставляем
root.append(createTodoApp(tasks));

console.log("App served successfully.");
