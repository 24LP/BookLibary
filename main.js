class BookManager {
  constructor() {
    this.bookArr = [];
    this.init();
  }

  init() {
    document
      .getElementById("submit")
      .addEventListener("click", () => this.submit());
    document.addEventListener("DOMContentLoaded", () => this.setBooks());
  }

  toast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");

    const className =
      message === "Book added successfully" ? "success" : "delete";
    toast.classList.add(`toast-${className}`);

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }

  setBooks() {
    this.bookArr = localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];
    this.bookArr.forEach((book) => this.createTable(book));
  }

  submit() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = { title, author, isbn };

    this.clearFields();

    this.bookArr.push(book);
    localStorage.setItem("books", JSON.stringify(this.bookArr));

    this.createTable(book);
    this.toast("Book added successfully");
  }

  createTable(book) {
    const table = document.getElementById("book-list");

    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdISBN = document.createElement("td");
    const tdDelete = document.createElement("td");

    tdTitle.innerText = book.title;
    tdAuthor.innerText = book.author;
    tdISBN.innerText = book.isbn;

    const deleteButton = document.createElement("button");
    deleteButton.className = "del";
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", () => this.deleteBook(book.isbn));
    tdDelete.appendChild(deleteButton);

    tr.append(tdTitle, tdAuthor, tdISBN, tdDelete);
    table.appendChild(tr);
  }

  deleteBook(isbn) {
    this.bookArr = this.bookArr.filter((book) => book.isbn !== isbn);

    localStorage.setItem("books", JSON.stringify(this.bookArr));

    const table = document.getElementById("book-list");
    Array.from(table.rows).forEach((row) => {
      if (row.cells[2].innerText === isbn) {
        row.remove();
      }
    });

    this.toast("Book deleted successfully");
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

const bookManager = new BookManager();
