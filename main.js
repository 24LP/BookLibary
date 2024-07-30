let bookArr = [];

document.getElementById("submit").addEventListener("click", () => submit());

document.addEventListener("DOMContentLoaded", () => {
  setBooks();
});

const toast = (message) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  const className =
    message === "Book added successfully" ? "success" : "delete";
  toast.classList.add(`toast-${className}`);

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

function setBooks() {
  bookArr = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];

  bookArr.forEach((book) => {
    createTable(book);
  });
}

function submit() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isbn = document.getElementById("isbn").value;

  const book = {
    title,
    author,
    isbn,
  };

  clearFields();

  bookArr.push(book);
  localStorage.setItem("books", JSON.stringify(bookArr));

  createTable(book);

  toast("Book added successfully");
}

function createTable(book) {
  let table = document.getElementById("book-list");

  const tr = document.createElement("tr");
  const tdTitle = document.createElement("td");
  const tdAuthor = document.createElement("td");
  const tdISBN = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdTitle.innerText = book.title;
  tdAuthor.innerText = book.author;
  tdISBN.innerText = book.isbn;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => deleteBook(book.isbn));
  tdDelete.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdISBN);
  tr.appendChild(tdDelete);

  table.appendChild(tr);
}

function deleteBook(isbn) {
  // fix
  bookArr = bookArr.filter((book) => book.isbn !== isbn);
  
  // fix
  localStorage.setItem("books", JSON.stringify(bookArr));

  // fix
  const table = document.getElementById("book-list");
  const rows = Array.from(table.rows);
  rows.forEach((row) => {
    if (row.cells[2].innerText === isbn) {
      row.remove();
    }
  });

  toast("Book deleted successfully");
}

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

function refreshPage() {
  location.reload();
}
