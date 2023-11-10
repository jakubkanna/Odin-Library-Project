const LibraryData = (function () {
  let myLibrary = [];

  class Book {
    constructor(author, title, pages, status) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.status = status;
    }
  }

  return {
    myLibrary,
    Book,
  };
})();

const LibraryUI = (function () {
  const containerElement = document.querySelector("#container");

  function createCardElement(book) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card-book";
    cardDiv.innerHTML = `
      <a href="#" class="title">
        <h5>${book.title}</h5>
      </a>
      <p class="author">${book.author}</p>
      <p class="pages">Pages: ${book.pages}</p>
      <div>
        <button class="status" href="#">
          ${book.status}
        </button>
        <button class="delete">
          Delete
        </button>
      </div>
    `;
    containerElement.appendChild(cardDiv);
    console.log(book + "card created");

    return cardDiv;
  }

  return {
    createCardElement,
  };
})();

const LibraryController = (function () {
  const containerElement = document.querySelector("#container");

  const formElement = `<form class="card-form">
    <label for="title">Book title</label>
    <input type="text" name="title" id="title" required />

    <label for="author">Author name</label>
    <input type="text" name="author" id="author" required />

    <label for="pages">Pages number</label>
    <input type="text" name="pages" id="pages" required />

    <button id="submit" type="button">Add</button>
  </form>`;

  // create form
  containerElement.innerHTML = formElement;

  // add book to library when submit button is pressed
  document
    .querySelector("button#submit")
    .addEventListener("click", addBookToLibrary);

  function addBookToLibrary(event) {
    // get form data
    const formTitle = document.getElementById("title");
    const formAuthor = document.getElementById("author");
    const formPages = document.getElementById("pages");

    // validate data and push to array if correct
    if (formTitle.value && formAuthor.value && !isNaN(formPages.value)) {
      const data = new LibraryData.Book(
        formAuthor.value,
        formTitle.value,
        formPages.value,
        "Not read"
      );

      // add book to the library
      LibraryData.myLibrary.push(data);

      // create card element
      const cardElement = LibraryUI.createCardElement(data);

      // handle delete and status buttons for the new card
      handleDeleteButton(cardElement, data);
      handleStatusButton(cardElement, data);

      formAuthor.value = "";
      formTitle.value = "";
      formPages.value = "";
    } else {
      alert("Please fill all the fields and ensure 'Pages' is a valid number.");
    }
  }

  function handleDeleteButton(cardElement, book) {
    const deleteButton = cardElement.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
      // remove from DOM
      cardElement.remove();
      // remove from array
      const index = LibraryData.myLibrary.indexOf(book);
      LibraryData.myLibrary.splice(index, 1);
    });
  }

  function handleStatusButton(cardElement, book) {
    const statusButton = cardElement.querySelector(".status");
    statusButton.addEventListener("click", () => {
      // toggle the status
      book.status = book.status === "Not read" ? "Read" : "Not read";
      statusButton.innerHTML = book.status;
      statusButton.classList.toggle("read");
    });
  }
})();
