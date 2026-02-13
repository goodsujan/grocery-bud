import { createItems } from "./items.js";
// ....
import { createForm } from "./form.js";
import { createCounter } from "./counter.js";
import { showNotification, autoHideNotification, setAutoHideCallback } from "./notification.js";
// Local Storage Functions
function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// Initialize items from local storage
let items = getLocalStorage();
let editId = null;
let currentNotification = null;

// Set up auto-hide callback
setAutoHideCallback(() => {
  currentNotification = null;
  render();
});

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  ); // edited line
  const counterElement = createCounter(items);
  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(counterElement);

  // Insert notification if exists
  if (currentNotification) {
    app.appendChild(currentNotification);
  }

  app.appendChild(itemsElement);
}

// Initialize App
render();
// ....

// Edit Completed Function
export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

// ....

// Remove Item Function
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  currentNotification = showNotification("Item Deleted Successfully!", "delete");
  render();
  autoHideNotification();
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add Item Function
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items = [...items, newItem];
  setLocalStorage(items);
  currentNotification = showNotification("Item Added Successfully!", "success");
  render();
  autoHideNotification();
}

// Update Item Name Function
export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  currentNotification = showNotification("Item Updated Successfully!", "edit");
  render();
  autoHideNotification();
}

// Set Edit ID Function
export function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}

// Set Date
const date = document.getElementById("date");
if (date) {
  date.innerHTML = new Date().getFullYear();
}