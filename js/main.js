const library_collection = [];

function Book(title, author, page_count, year_published, checked_out) {

    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year_published = year_published;
    this.checked_out = checked_out;
    this.getCompleteSummary = function() {

        let summary = `The book: ${title} by ${author} is ${page_count} pages long ${'\n'} and was published in the year ${year_published}.` + " " + (checked_out == true ? "It is currently checked out." : "It is currently not checked out.");
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

