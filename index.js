console.log("index.js");

class Book {
    constructor(id, name, author, type) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.type = type;
    };
}


showBooks();

let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(event){
    console.log("btn clicked");
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let type;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cosmos = document.getElementById("cosmos");

    if(fiction.checked){
        type = fiction.value;
    }
    else if(programming.checked){
        type = programming.value;
    }
    else{
        type = cosmos.value;
    }

    let book = new Book(Date.now(), name, author, type);

    let display = new Display();
    if(display.validate()){
        saveBook(book);
        display.clear();
        console.log(book + Book.BookCount);
        display.showMessage('Success');
    }
    else{
        // show error
        display.showMessage('Error');
    }
    event.preventDefault();
    showBooks();
}

class Display {
    constructor() { }
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate() {
        let name = document.getElementById("name").value;
        let author = document.getElementById("author").value;

        if (name.length > 2 && author.length > 2) {
            return true;
        }
        else {
            return false;
        }
    }
    showMessage(status) {
        let messageDiv = document.getElementById("messageDiv");
        let message;
        let errorMessage;
        let htmlString;
        if (status == 'Error') {
            message = 'warning';
            errorMessage = 'Cannot add Book. Book Name and Author should be more than 2 chars';
        }
        else if (status == 'Success') {
            message = 'success';
            errorMessage = 'Book added successfully';
        }
        htmlString = `<div class="alert alert-${message} alert-dismissible fade show" role="alert">
                    <strong>${status}! </strong> ${errorMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;

        messageDiv.innerHTML = htmlString;
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 5000);
    }
}; 

function saveBook(book) {
    let books = localStorage.getItem("books");

    if(books == null){
        booksArray = [];
    }
    else{
        booksArray = JSON.parse(books);
    }
    booksArray.push(book);
    localStorage.setItem("books", JSON.stringify(booksArray));
}

function showBooks(){
    let books = localStorage.getItem("books");
    if(books == null){
        booksArray = [];
    }
    else{
        booksArray = JSON.parse(books);
    }

    let tableRow = document.getElementById("tableBody");
    tableRow.innerHTML = "";
    Array.from(booksArray).forEach(book => {
        htmlString = ` <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><button id="${book.id}" class="btn fas fa-trash-alt trashBtn" onclick="deleteBook(${book.id})"></i></button></td>
                        </tr>`;
        tableRow.innerHTML += htmlString;
    });
}

function deleteBook(id){
    let books = localStorage.getItem("books");
    if(books == null){
        booksArray = [];
    }
    else{
        booksArray = JSON.parse(books);
    }

    console.log(`Book array length- ${booksArray.length}`);
    booksArray.forEach((book, index) => {
        if(book.id === id){
            console.log(`Book with id- ${book.id} is deleted`);
            booksArray.splice(index, 1);
        }
    });
    console.log(`Book array length- ${booksArray.length}`);
    localStorage.setItem("books", JSON.stringify(booksArray));
    showBooks();
}
