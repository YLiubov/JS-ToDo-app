// ==========================
// ATOMS — самые маленькие элементы
// Каждый атом создаёт ОДИН HTML элемент и возвращает его
// ==========================

console.log("atoms.js loaded");

// Универсальный атом: создаёт любой HTML-тег
export const BasicElm = (tagName, { id = "", className = "" } = {}) => {
  const elm = document.createElement(tagName); // создаём элемент
  if (id) elm.id = id;                         // id если передали
  if (className) elm.className = className;    // class если передали
  return elm;                                  // возвращаем элемент
};

// Атом для текста: любой тег + текст
export const TextElm = (tagName, textContent, { className = "" } = {}) => {
  const elm = document.createElement(tagName);
  elm.textContent = textContent;
  if (className) elm.className = className;
  return elm;
};

// Атом input
export const InputElm = (
  type,
  { id = "", name = "", placeholder = "", className = "" } = {},
) => {
  const elm = document.createElement("input");
  elm.type = type;
  if (id) elm.id = id;
  if (name) elm.name = name;
  if (placeholder) elm.placeholder = placeholder;
  if (className) elm.className = className;
  return elm;
};

// Атом label
export const LabelElm = (textContent, htmlFor = "", { className = "" } = {}) => {
  const elm = document.createElement("label");
  elm.textContent = textContent;
  if (htmlFor) elm.htmlFor = htmlFor;
  if (className) elm.className = className;
  return elm;
};

// Атом button
export const ButtonElm = (
  textContent,
  { type = "button", className = "" } = {},
) => {
  const elm = document.createElement("button");
  elm.type = type;               // важно: чтобы не сабмитить форму
  elm.textContent = textContent;
  if (className) elm.className = className;
  return elm;
};

// Атом form
export const FormElm = ({ method = "GET", className = "" } = {}) => {
  const elm = document.createElement("form");
  elm.method = method;
  if (className) elm.className = className;
  return elm;
};

// Атом ul / li
export const UlElm = ({ className = "" } = {}) => {
  const elm = document.createElement("ul");
  if (className) elm.className = className;
  return elm;
};

export const LiElm = ({ className = "" } = {}) => {
  const elm = document.createElement("li");
  if (className) elm.className = className;
  return elm;
};


// ===============================
// АТОМ: ImgElm
// Создаёт <img> элемент (подходит и для svg файлов)
// ===============================

export const ImgElm = (
  src,                       // путь к файлу
  alt = "",                  // описание (для доступности)
  { id = "", className = "" } = {}   // дополнительные настройки
) => {

  // создаём <img>
  const img = document.createElement("img");

  // устанавливаем путь к файлу
  img.src = src;

  // устанавливаем альтернативный текст
  img.alt = alt;

  // если передан id — добавляем
  if (id) img.id = id;

  // если передан класс — добавляем
  if (className) img.className = className;

  // возвращаем готовый элемент
  return img;
};

