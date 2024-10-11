const myLibrary = [];
const bookList = document.querySelector('.book-list');
const showFormBtn = document.querySelector('.header__button');
const newBookForm = document.querySelector('.book-list__form');
const addBookBtn = document.querySelector('.book-list-form__button');
const inputFields = document.querySelectorAll('.new-book-input');
let bookItems = document.querySelectorAll('.book-item');


function Book(title, author, pages, read) {
    this.book_title = title;
    this.book_author = author;
    this.book_pages = pages;
    this.book_status = read;
    // this.info = function() {
    //     return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.read}.`;
    // }
}


const book1 = new Book('The Mysterious Island', 'J. Verne', 524, true);
const book2 = new Book('The Art of Loving', 'E. Fromm', 104, true);
const book3 = new Book('The Brothers Karamazov', 'F. Dostoevsky', 824, false);
const book4 = new Book('Two lives', 'K. Antarova', 500, false);

myLibrary.push(book1, book2, book3, book4);


function addBookToLibrary(newBook) {
    // myLibrary.push(newBook);
    const newBookRow = document.createElement('section');
    
    newBookRow.classList.add('book-item');
    newBookRow.setAttribute('data', myLibrary.indexOf(newBook));
    
    for (const property in newBook) {
        
        function addTableCell(tableCell) {
            const textContent = document.createTextNode(newBook[property]);
            tableCell.appendChild(textContent);
            tableCell.classList.add(property);
            newBookRow.appendChild(tableCell);
            if (tableCell.textContent === 'false' || tableCell.textContent === '' || tableCell.textContent === '-' || tableCell.textContent === 'off' || tableCell.textContent === 'off') {
                tableCell.textContent = '-';
            } else if (tableCell.textContent === 'true' || tableCell.textContent === 'read' || tableCell.textContent === 'on') {
                tableCell.textContent = 'read';
            }
        }
        
        if (property === 'title') {
            const tableCell = document.createElement('h3');
            addTableCell(tableCell);
        } else {
            const tableCell = document.createElement('p');
            addTableCell(tableCell);
        }
    }

    const removeBookBtn = document.createElement('a');
    const xmark = document.createElement('i');
    removeBookBtn.classList.add('link', 'button_remove');
    xmark.classList.add('fa-solid', 'fa-xmark');
    removeBookBtn.appendChild(xmark);
    removeBookBtn.setAttribute('data', myLibrary.indexOf(newBook));
    newBookRow.appendChild(removeBookBtn);
    
    bookList.appendChild(newBookRow);

    bookItems = document.querySelectorAll('.book-item');

    removeBook(removeBookBtn);


}


myLibrary.forEach((e) => addBookToLibrary(e));


showFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (showFormBtn.textContent === "Add new book") {
        showFormBtn.textContent = "Hide form";
        newBookForm.style.display = 'block';
        newBookForm.reset();
    } else {
        showFormBtn.textContent = "Add new book";
        newBookForm.style.display = 'none';
        newBookForm.reset();
    }
});

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newBookTitle = document.querySelector('#new-book_title').value;
    const newBookAuthor = document.querySelector('#new-book_author').value;
    const newBookPages = document.querySelector('#new-book_pages').value;
    const newBookStatus = document.querySelector('#new-book_status').value;
    const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookStatus);

    if (newBookTitle === '' || newBookAuthor === '' || newBookPages === '') {
        if (document.querySelector('.form-notification')) {
            document.querySelector('.form-notification').remove();
        }
        const formNotification = document.createElement('span');
        const textContent = document.createTextNode('Please fill in all the fields.');
        formNotification.classList.add('form-notification');
        formNotification.appendChild(textContent);
        newBookForm.appendChild(formNotification);
        return;
    }
    if (document.querySelector('.form-notification')) {
        document.querySelector('.form-notification').remove();
    }
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
    newBookForm.reset();
});


inputFields.forEach((e) => {
    e.addEventListener('focus', () => {
        if (document.querySelector('.form-notification')) {
            document.querySelector('.form-notification').remove();
        }
    })
});


function removeBook(removeBookBtn) {
    removeBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        bookItems.forEach((book) => {
            if (removeBookBtn.getAttribute('data') === book.getAttribute('data')) {
                myLibrary.splice(book.getAttribute('data'), 1, '');
                book.remove();
                return;
            }
        });
    });
}