const enterButton = document.querySelector(".enter");
const intro = document.querySelector(".intro");
const formPopUp = document.querySelector(".form-popUp");
const addButton = document.querySelector(".add-btn");
const bookContainer = document.querySelector(".bookContainer");
const requestFormButton = document.querySelector(".request-form");

const bookData = function () {
  return {
    title: form.title.value,
    author: form.author.value,
    pages: form.pages.value,
    read: form.read.checked,
  };
};

let booksArray = [];
let newBook;

function addToLibrary() {
  newBook = bookData();
  booksArray.push(newBook);
  populateStorage();
  form.reset();
  addBookNode();
}

function addBookNode() {
  const bookNodes = document.querySelectorAll(".bookNode");
  bookNodes.forEach((node) => bookContainer.removeChild(node));

  for (let i = 0; i < booksArray.length; i++) {
    createBookNode(booksArray[i]);
  }
}

function createBookNode(data) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("id", `bookNode${booksArray.indexOf(data)}`);
  bookDiv.classList.add("bookNode");
  bookContainer.appendChild(bookDiv);

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("bookTitle");
  titleDiv.textContent = data.title;
  bookDiv.appendChild(titleDiv);

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("bookAuthor");
  authorDiv.textContent = data.author;
  bookDiv.appendChild(authorDiv);

  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("bookPages");
  pagesDiv.textContent = data.pages;
  bookDiv.appendChild(pagesDiv);

  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  bookDiv.appendChild(readBtn);
  if (data.read === false) {
    readBtn.textContent = "Not Read";
    readBtn.style.backgroundColor = "#e04f63";
  } else {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#63da63";
  }

  readBtn.addEventListener("click", () => {
    data.read = !data.read;
    populateStorage();
    addBookNode();
  });

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeButton");
  removeBtn.textContent = "Remove";
  bookDiv.appendChild(removeBtn);

  removeBtn.addEventListener("click", () => {
    let bookRemove = document.getElementById(
      `bookNode${booksArray.indexOf(data)}`
    );
    bookContainer.removeChild(bookRemove);
    booksArray.splice(booksArray.indexOf(data), 1);
    populateStorage();
    addBookNode();
  });
}

//Events for buttons
enterButton.addEventListener("click", () => {
  event.preventDefault();
  intro.classList.add("fadeOut");
  setTimeout(formAnimation, 500);
  function formAnimation() {
    bookContainer.classList.add("fadeIn");
  }
});

requestFormButton.addEventListener("click", () => {
  event.preventDefault();
  bookContainer.classList.remove("fadeIn");
  bookContainer.classList.add("fadeOut");
  setTimeout(formAnimation, 500);
  function formAnimation() {
    formPopUp.classList.remove("fadeOut");
    formPopUp.classList.add("fadeIn");
  }
});

addButton.addEventListener("click", () => {
  event.preventDefault();
  addToLibrary();
  formPopUp.classList.remove("fadeIn");
  formPopUp.classList.add("fadeOut");
  setTimeout(formAnimation, 500);
  function formAnimation() {
    bookContainer.classList.remove("fadeOut");
    bookContainer.classList.add("fadeIn");
  }
});

//Storage
function populateStorage() {
  localStorage.setItem("booksArray", JSON.stringify(booksArray));
}

function restoreStorage() {
  if (!localStorage.booksArray) {
    addBookNode();
  } else {
    let newBooksArray = localStorage.getItem("booksArray");
    newBooksArray = JSON.parse(newBooksArray);
    booksArray = newBooksArray;
    addBookNode();
  }
}

restoreStorage();
