const myLibrary = [];
const bookList = document.querySelector('.book-list');
const newBookBtn = document.querySelector('.header__button');

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

myLibrary.push(book1, book2, book3)


function addBookToLibrary(newBook) {
    // myLibrary.push(newBook);
    const newBookRow = document.createElement('section');
    
    newBookRow.classList.add('book-item');
    
    for (const property in newBook) {
        
        function addTableCell(tableCell) {
            const textContent = document.createTextNode(newBook[property]);
            tableCell.appendChild(textContent);
            tableCell.classList.add(property);
            newBookRow.appendChild(tableCell);
            if (tableCell.textContent === 'false') {
                tableCell.textContent = '-';
            } else if (tableCell.textContent === 'true') {
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
    
    bookList.appendChild(newBookRow);
    
    
}

myLibrary.forEach((e) => addBookToLibrary(e));

newBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
});
