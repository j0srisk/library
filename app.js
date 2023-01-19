const showModalButton = document.getElementById("show-modal-button");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const main = document.querySelector("main");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookCard(Book) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.setAttribute("book-id", myLibrary.indexOf(Book));

  const bookTitle = document.createElement("h2");
  const bookTitleText = document.createTextNode(Book.title);

  const bookAuthor = document.createElement("p");
  const bookAuthorText = document.createTextNode(Book.author);

  const bookPages = document.createElement("p");
  const bookPagesNumber = document.createTextNode(`Pages: ${Book.pages}`);

  const bookRead = document.createElement("p");
  bookRead.className = "read";
  const bookReadBoolean = document.createTextNode(`Read: ${Book.read}`);

  const readButton = document.createElement("button");
  readButton.className = "read-button";
  readButton.setAttribute("book-id", myLibrary.indexOf(Book));
  const readButtonText = document.createTextNode("Toggle Read");

  readButton.addEventListener("click", toggleRead);

  bookTitle.appendChild(bookTitleText);
  cardDiv.appendChild(bookTitle);
  bookAuthor.appendChild(bookAuthorText);
  cardDiv.appendChild(bookAuthor);
  bookPages.appendChild(bookPagesNumber);
  cardDiv.appendChild(bookPages);
  bookRead.appendChild(bookReadBoolean);
  cardDiv.appendChild(bookRead);
  readButton.appendChild(readButtonText);
  cardDiv.appendChild(readButton);
  main.appendChild(cardDiv);
}

function toggleRead(event) {
  if (myLibrary[event.target.getAttribute("book-id")].read === true) {
    myLibrary[event.target.getAttribute("book-id")].read = false;
  } else {
    myLibrary[event.target.getAttribute("book-id")].read = true;
  }
  console.log(myLibrary[event.target.getAttribute("book-id")].read);
  event.target.previousElementSibling.innerHTML = (`Read: ${myLibrary[event.target.getAttribute("book-id")].read}`);
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
  addBookCard(Book);
}

// toggles modal visablity
showModalButton.onclick = function () {
  modal.style.display = "flex";
};

// hides modal on click outside form
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// creates book with form values, adds to library array, and resets inputs
form.onsubmit = function (event) {
  event.preventDefault();
  const tempBook = new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("read").checked);
  addBookToLibrary(tempBook);
  modal.style.display = "none";
  form.reset();
};

addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
addBookToLibrary(new Book("1984", "George Orwell", 354, true));
