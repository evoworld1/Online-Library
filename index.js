const enterButton = document.querySelector(".enter");
const intro = document.querySelector(".intro");
const formPopUp = document.querySelector(".form-popUp");
const addButton = document.querySelector(".add-btn");
const bookContainer = document.querySelector(".bookContainer");
const requestFormButton = document.querySelector(".request-form");

class bookData {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }
}

let booksArray = [];
let newBook;

function addBookNode() {
  newBook = new bookData(title, author, pages, read);
  booksArray.push(newBook);
  for (let i = 0; i < booksArray.length; i++) {
    createBookNode(booksArray[i]);
  }
}

function createBookNode(data) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("id", `bookNode`);
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
}

//Events for animations
enterButton.addEventListener("click", () => {
  event.preventDefault();
  intro.classList.add("fadeOut");
  setTimeout(formAnimation, 500);
  function formAnimation() {
    formPopUp.classList.add("fadeIn");
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
  addBookNode();
  form.reset();
  formPopUp.classList.remove("fadeIn");
  formPopUp.classList.add("fadeOut");
  setTimeout(formAnimation, 500);
  function formAnimation() {
    bookContainer.classList.remove("fadeOut");
    bookContainer.classList.add("fadeIn");
  }
});

//check TEST ONLY!

const checkBtn = document.querySelector(".check-array");

checkBtn.addEventListener("click", () => {
  console.log(booksArray);
});
