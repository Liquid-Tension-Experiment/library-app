const myLibrary = [];
const bookDisplay = document.querySelector(".book-display")
const addButton = document.querySelector(".add-book-btn");

function Book(title, author, year, pageCount, beenRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.beenRead = beenRead;
    this.year = year;
    this.idNum = crypto.randomUUID().toString();
}

Book.prototype.updateReadStatus = function() {
    this.beenRead = !this.beenRead;
    displayBooks();
};

// Read form, then add and display the new entry
addButton.addEventListener("click", (event)=> {
    let f = document.querySelector(".add-book");
    if(!f.checkValidity()) {
        alert('Fill out all fields to add a new book.');
        return;
    }

    let newTitle = document.querySelector("#book-title").value;
    let newAuthor = document.querySelector("#book-author").value;
    let newYear = document.querySelector("#book-year").value;
    let newPages = document.querySelector("#book-pages").value;
    let newIsRead = true;
    let radioButtons = document.querySelectorAll('input[name="book-read"]');

    for(const radBut of radioButtons){
        if(radBut.checked) {
            newIsRead = radBut.value == "true" ? true : false;
            radBut.checked = false;
        }
    }

    // clear forms
    let inputFields = document.querySelectorAll("input[type='text']");
    for (const a of inputFields){
        a.value = "";
    }

    addBookToLibrary(newTitle, newAuthor, newYear, newPages, newIsRead);
    displayBooks();

});


function addBookToLibrary(title, author, year, pageCount, beenRead) {
    let newBook = new Book(title, author, year, pageCount, beenRead);
    myLibrary.push(newBook);
}

function displayBooks(){
    // Clear out current display
    while (bookDisplay.firstChild){
        bookDisplay.removeChild(bookDisplay.lastChild);
    }

    myLibrary.forEach(book => {
        let newEntry = document.createElement("div");
        newEntry.setAttribute('data-id-num', book.idNum.toString());
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

        let readText = document.createElement("p");
        readText.classList.add("read-text")
        if (book.beenRead){
            readText.innerHTML = 'You <span style="color: #0284C7;">have read</span> this book.';
        } else {
            readText.innerHTML = 'You <span style="color: #EA580C;">have not read</span> this book.';
        }
        newEntry.appendChild(readText);
        
        let cardButtons = document.createElement("div");
        cardButtons.classList.add("button-row")

        let changeReadStatus = document.createElement("button");
        changeReadStatus.textContent = "Read?"
        changeReadStatus.classList.add("btn-main");
        changeReadStatus.id = "change-read-btn";
        changeReadStatus.setAttribute('type', 'submit');
        changeReadStatus.addEventListener("click", ChangeReadStatus);
        cardButtons.appendChild(changeReadStatus);

        let removeBook = document.createElement("button");
        removeBook.textContent = "Delete";
        removeBook.classList.add("btn-main");
        removeBook.id = "remove-book-btn";
        removeBook.setAttribute('type', 'submit');
        removeBook.addEventListener("click", RemoveBook);
        cardButtons.appendChild(removeBook);

        newEntry.appendChild(cardButtons);
        bookDisplay.appendChild(newEntry);
    });
}

function RemoveBook(e) {
    let target = e.target;
    let targetCard = target.parentNode.parentNode;
    let targetNum = targetCard.getAttribute('data-id-num');

    while(myLibrary.findIndex((book) =>
    book.idNum==targetNum ) != -1){
        let index = myLibrary.findIndex((book2) =>
            book2.idNum==targetNum
        );
        myLibrary.splice(index,1);  
    }
    displayBooks();
    e.preventDefault();
}

function ChangeReadStatus(e) {
    let target = e.target;
    let targetCard = target.parentNode.parentNode;
    let targetNum = targetCard.getAttribute('data-id-num');

    myLibrary.forEach(book => {
        if(book.idNum == targetNum){
            book.updateReadStatus();
        }
    });
    e.preventDefault();
}

addBookToLibrary("For Whom the Bell Tolls", "Ernest Hemingway", 1940, 351, true);
addBookToLibrary("Einstein: His Life and Universe", "Walter Isaacson", 2007,  402, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 299, false);
addBookToLibrary("Lord of the Rings", "JRR Tolkien", 1960, 900, true);

displayBooks()