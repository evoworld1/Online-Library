const enterButton = document.querySelector(".enter");
const intro = document.querySelector(".intro");
const formPopUp = document.querySelector(".form-popUp");
const addButton = document.querySelector(".add-btn");
const bookContainer = document.querySelector(".bookContainer");
const requestFormButton = document.querySelector(".request-form");

class bookData {
  constructor(title, author, pages, read) {
    this.id = ++uniqueId;
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }
}

let booksArray = [];
let uniqueId = 0;
let newBook;

function addToLibrary() {
  newBook = new bookData(title, author, pages, read);
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
