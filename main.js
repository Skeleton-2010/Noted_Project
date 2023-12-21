const formBtn = document.querySelector(".form-button");
const formInp = document.querySelector(".form-input");
const contentNotes = document.querySelector(".content-notes");
const searchInp = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");

const storage = Object.entries(localStorage);

function genKey(storage) {
  const storageKeys = storage.map((entry) => entry[0]);
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  let key = "";
  do {
    key = "";
    for (let C = 0; C < 15; C++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (storageKeys.includes(key));
  return key;
}

function filterMessages(filter) {
  const storageKeys = storage.map((entry) => entry[0]);
  let matchings = [];
  for (let K of storageKeys) {
    if (localStorage.getItem(K).toUpperCase().includes(filter.toUpperCase())) {
      matchings.push(K);
    }
  }
  return matchings;
}

function reloadMesages(keys) {
  contentNotes.innerHTML = ``;
  if (keys.length < 1) {
    contentNotes.innerHTML = `Nothing here :-(`;
  } else {
    for (let K of keys) {
      const newItem = document.createElement("div");
      newItem.classList.add("notes-item");
      newItem.innerHTML = `
            <h3 class="item-text">${localStorage.getItem(K)}</h3>
        `;
      contentNotes.appendChild(newItem);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const storageKeys = storage.map((entry) => entry[0]);
  reloadMesages(storageKeys);
});

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  matchingKeys = filterMessages(searchInp.value);
  reloadMesages(matchingKeys);
});

formBtn.addEventListener("click", (event) => {
  if (formInp.value.trim() !== "" && formInp.value.length <= 1000) {
    const formKey = genKey(storage);
    localStorage.setItem(formKey, formInp.value);
    const newItem = document.createElement("div");
    newItem.classList.add("notes-item");
    newItem.innerHTML = `<h3 class="item-text">${formInp.value}</h3>`;
    contentNotes.appendChild(newItem);
    formInp.value = "";
  } else {
    event.preventDefault();
    alert("Invalid text.");
  }
});

// localStorage.clear()
