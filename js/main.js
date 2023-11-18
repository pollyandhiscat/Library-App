const library_collection = [];

function Book(title, author, page_count, year_published, checked_out) {

    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year_published = year_published;
    this.checked_out = checked_out;
    this.getCompleteSummary = function() {

        let summary = `The book: ${title} by ${author} is ${page_count} pages long ${'\n'} and was published in the year ${year_published}.` + " " + (checked_out == true ? "It is currently checked out." : "It is currently not checked out.");
    }
}

function add_book_to_library(title, author, page_count, year_published, checked_out) {

    /*

    Builds a new book and adds it
    to the library collection.

    */

    let new_book = Book(title, author, page_count, year_published, checked_out=false);
    library_collection.push(book);

}



