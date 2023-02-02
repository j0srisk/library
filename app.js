const showModalButton = document.getElementById("show-modal-button");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const main = document.querySelector("main");

class Library {
  constructor() {
    this.LibraryArray = [];
  }

  addBook(Book) {
    this.LibraryArray.push(Book);
    const card = new BookCard(Book);
    card.createCard(Book);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    const currentBook = myLibrary.LibraryArray[this.getAttribute("book-id")];
    if (currentBook.read === true) {
      currentBook.read = false;
    } else {
      currentBook.read = true;
    }

    this.previousElementSibling.innerHTML = `Read: ${currentBook.read}`;
  }
}

class BookCard {
  constructor(Book) {
    this.Book = Book;
  }

  createCard(Book) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute("book-id", myLibrary.LibraryArray.indexOf(Book));

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
    readButton.setAttribute("book-id", myLibrary.LibraryArray.indexOf(Book));
    const readButtonText = document.createTextNode("Toggle Read");

    readButton.addEventListener("click", Book.toggleRead);

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
  myLibrary.addBook(new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("read").checked));
  modal.style.display = "none";
  form.reset();
};

const myLibrary = new Library();

myLibrary.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
myLibrary.addBook(new Book("1984", "George Orwell", 354, true));