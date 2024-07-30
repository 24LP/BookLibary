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
  let del = `<td><button id="del">X</button></td>`;

  console.log(title);
  console.log(author);
  console.log(isbn);

  const book = {
    title,
    author,
    isbn,
    del,
  };

  clearFields();

  bookArr.push(book);
  localStorage.setItem("books", JSON.stringify(bookArr));

  createTable(book);

  toast("Book added successfully");
}

function createTable(book) {
  let table = document.getElementById("book-list");

  const elems = [];

  const tr = document.createElement("tr");
  const tdTitle = document.createElement("td");
  const tdAuthor = document.createElement("td");
  const tdISBN = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdTitle.innerText = book.title;
  tdAuthor.innerText = book.author;
  tdISBN.innerText = book.isbn;
  tdDelete.innerHTML = book.del;

  elems.push(tdTitle);
  elems.push(tdAuthor);
  elems.push(tdISBN);
  elems.push(tdDelete);

  elems.forEach((el) => tr.appendChild(el));

  table.appendChild(tr);

  tdDelete.addEventListener("click", () => deleteBook(tr));
}

function deleteBook(tr) {
  let cells = tr.querySelectorAll("td");
  let isbn = cells[2].textContent;

  bookArr = bookArr.filter((book) => book.isbn !== isbn);
  tr.remove();
  localStorage.setItem("books", JSON.stringify(bookArr));
  toast("Book deleted successfully");
}

// function deleteBook(tr, tdTitle, tdAuthor, tdISBN, tdDelete) {
//   localStorage.clear(tdTitle, tdAuthor, tdISBN, tdDelete);
//   localStorage.clear(tr);
//   tdTitle.remove();
//   tdAuthor.remove();
//   tdISBN.remove();
//   tdDelete.remove();
//   tr.remove();
//   refreshPage();
// }

function clearFields() {
  (document.getElementById("title").value = ""),
    (document.getElementById("author").value = ""),
    (document.getElementById("isbn").value = "");
}

function refreshPage() {
  location.reload();
}
