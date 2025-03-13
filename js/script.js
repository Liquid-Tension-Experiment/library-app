const myLibrary = [];
const bookDisplay = document.querySelector(".book-display")
const addButton = document.querySelector(".add-book-btn");

addButton.addEventListener("click", (event)=> {
    let newTitle = document.querySelector("#book-title").value;
    let newAuthor = document.querySelector("#book-author").value;
    let newYear = document.querySelector("#book-year").value;
    let newPages = document.querySelector("#book-pages").value;
    let newIsRead = true;
    let radioButtons = document.querySelectorAll('input[name="book-read"]');
    for(const radBut of radioButtons){
        if(radBut.checked) {
            newIsRead = radBut.value == "true" ? true : false;
        }
    }
    console.log('test');
    addBookToLibrary(newTitle, newAuthor, newYear, newPages, newIsRead);
    displayBooks();
    event.preventDefault();
});
function Book(title, author, year, pageCount, beenRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.beenRead = beenRead;
    this.year = year;
    this.idNum = crypto.randomUUID();
}

function addBookToLibrary(title, author, year, pageCount, beenRead) {
    let newBook = new Book(title, author, year, pageCount, beenRead);
    myLibrary.push(newBook);
}

function displayBooks(){
    while (bookDisplay.firstChild){
        bookDisplay.removeChild(bookDisplay.lastChild);
    }
    myLibrary.forEach(book => {
        let newEntry = document.createElement("div");
        newEntry.classList.add("book-card");

        let titleText = document.createElement("h3");
        titleText.classList.add("title-text");
        titleText.textContent = book.title + ` (${book.year})`;
        newEntry.appendChild(titleText);

        let authorText = document.createElement("p");
        authorText.classList.add("author-text");
        authorText.textContent = book.author;
        newEntry.appendChild(authorText);

        let pageText = document.createElement("p");
        pageText.classList.add("page-text");
        pageText.textContent = book.pageCount.toString() + " pages";
        newEntry.appendChild(pageText);

        bookDisplay.appendChild(newEntry);

    });
}
addBookToLibrary("For Whom the Bell Tolls", "Ernest Hemingway", 1940, 351, true);
addBookToLibrary("Einstein: His Life and Universe", "Walter Isaacson", 2007,  402, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 299, false);
addBookToLibrary("Lord of the Rings", "JRR Tolkien", 1960, 900, true);

displayBooks();