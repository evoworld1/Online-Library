function libraryCheck() {}

libraryCheck.prototype.showInfo = function () {
  return this.title + this.author + this.pages + this.readOrNot;
};

function library(title, author, pages, readOrNot) {
  //that's the constructor function
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readOrNot = readOrNot;
}

library.prototype = Object.create(libraryCheck.prototype);

const book = new library("Boska cząstka", "L. Lederman", 500, "not read");

book.showInfo();

console.log(book.showInfo());
