const library_collection = [];

let library_collection_display_area = document.getElementById('library_collection_display_area');


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

    let new_book = new Book(title, author, page_count, year_published, checked_out=false);
    library_collection.push(new_book);

}

function check_out_book(book){

    /* 

    Checks out a given book from
    the library, making checked_out = true.

    */

    book.checked_out = true;
}

function return_book(book){

    /* 

    Returns a given book to the
    library, making checked_out = false.

    */

    book.checked_out = false;
}

function display_book_on_page(book){

    /*

    Adds a book from the library
    collection to the page.

    */

    let title = book.title;
    let author = book.author;
    let page_count = book.page_count;
    let year_published = book.year_published;
    let checked_out = book.checked_out;

    let book_entry = document.createElement('div');
    book_entry.className = 'book_entry';

    let book_title = document.createElement('div');

    



    
}

function display_library_collection(){

    /*

    Displays the entire library collection.

    */

    for (let index = 0; index < library_collection.length; index++){

        let book = library_collection[index];

        
    }
}

