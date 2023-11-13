const library_collection = [];

function Book(title, author, page_count, year_published, checked_out) {

    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year_published = year_published;
    this.checked_out = checked_out;
}

function add_book_to_library(book) {

    /*

    Takes a book object and adds that
    book to the library's book collection.

    */

    library_collection.push(book);

}

