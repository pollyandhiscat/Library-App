const library_collection = [];

let library_collection_display_area = document.getElementById('library_collection_display_area');

let show_all_books_button = document.getElementById('show_all_books');
let show_available_books_button = document.getElementById('show_only_available_books');
let add_book_to_library_button = document.getElementById('add_book_to_library');
let check_out_book_button = document.getElementById('check_out_book');


function Book(title, author, page_count, year_published, checked_out) {

    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year_published = year_published;
    this.checked_out = checked_out;
    this.getCompleteSummary = function() {

        let summary = `The book: ${title} by ${author} is ${page_count} pages long ${'\n'} and was published in the year ${year_published}.` + ' ' + (checked_out == true ? 'It is currently checked out.' : 'It is currently not checked out.');
        return summary;
    }
}

function add_book_to_library(title, author, page_count, year_published) {

    /*

    Builds a new book and adds it
    to the library collection.

    */

    let new_book = new Book(title, author, page_count, year_published, checked_out = false);
    library_collection.push(new_book);

}

function check_out_book(book) {

    /* 

    Checks out a given book from
    the library, making checked_out = true.

    */

    book.checked_out = true;
}

function return_book(book) {

    /* 

    Returns a given book to the
    library, making checked_out = false.

    */

    book.checked_out = false;
}

function display_book_on_page(book) {

    /*

    Adds a book from the library
    collection to the page.

    */

    let book_elements = [];

    let title = book.title;
    let author = book.author;
    let page_count = book.page_count;
    let year_published = book.year_published;
    let checked_out = book.checked_out;

    let book_entry = document.createElement('div');
    book_entry.className = 'book_entry';

    let book_title = document.createElement('div');
    book_title.className = 'book_title';
    book_title.appendChild(document.createElement('h4').textContent = title);
    book_elements.push(book_title);

    let book_author = document.createElement('div');
    book_author.className = 'book_author';
    book_author.appendChild(document.createElement('h4').textContent = author);
    book_elements.push(book_author);

    let book_page_count = document.createElement('div');
    book_page_count.className = 'book_page_count';
    book_page_count.appendChild(document.createElement('h4').textContent = page_count);
    book_elements.push(book_page_count);

    let book_year_published = document.createElement('div');
    book_year_published.className = 'book_year_published';
    book_year_published.appendChild(document.createElement('h4').textContent = year_published);
    book_elements.push(book_year_published);

    let book_checked_out = document.createElement('div');
    book_checked_out.className = 'book_checked_out';
    book_checked_out.appendChild(document.createElement('h4').textContent = checked_out);
    book_elements.push(book_checked_out);

    // Add all book elements into book entry.
    for (let index = 0; index < 5; index++) {

        book_entry.appendChild(book_elements[index]);

    }

    // Book entry is now a blob of all book info for a single book that can be placed on the HTML page.
    library_collection_display_area.appendChild(book_entry);

}

function display_library_collection(available=false) {

    /*

    Displays the entire library collection.
    An optional parameter allows the collection
    to only display available (not checked out)
    books.

    */

    for (let index = 0; index < library_collection.length; index++) {

        let book = library_collection[index];
        if (available == true && book.available == true){

            display_book_on_page(book);

        }

        else {

            display_book_on_page(book);
        }

    }
}





show_all_books_button.addEventListener('click', ()=>{

    display_library_collection();
});

show_available_books_button.addEventListener('click', ()=>{

    display_library_collection(true);
});

add_book_to_library_button.addEventListener('click', ()=>{

    let new_book_popup_form = document.getElementById('new_book_popup_form');
    new_book_popup_form.style.display = 'block';
    //add_book_to_library();
});


