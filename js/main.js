const library_collection = [];
let book_id = 0; // Book ID will be a simple integer value, locally tracked. However, database storage should be considered for future iterations of this project.

let library_page = document.getElementById('library_page');
let library_collection_display_area = document.getElementById('library_collection_display_area');

let show_all_books_button = document.getElementById('show_all_books');
let show_read_books_button = document.getElementById('show_only_read_books');
let add_book_to_library_button = document.getElementById('add_book_to_library');
let check_out_book_button = document.getElementById('check_out_book');

function get_book_id(){

    /*

    Calculates and returns the next
    available book ID.

    */

    book_id += 1;
    return book_id;
}

function Book(title, author, page_count, year_published, read = false) {

    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year_published = year_published;
    this.read = read;
    this.book_id = get_book_id();
    this.getCompleteSummary = function () {

        let summary = `The book: ${title} by ${author} is ${page_count} pages long ${'\n'} and was published in the year ${year_published}.` + ' ' + (read == true ? 'I have read it.' : 'I have not read it.');
        return summary;
    }
}

function add_new_book_popup_form() {

    /*

    Returns the form element that
    allows users to add a new book
    to the library collection.

    */

    let form_elements = [];


    // Div holds everything.
    let new_book_popup_div = document.createElement('div');
    new_book_popup_div.className = 'new_book_popup_form';
    new_book_popup_div.id = 'new_book_popup_form';

    // Form nested inside div.
    let new_book_popup_form = document.createElement('form');
    new_book_popup_form.action = '';
    new_book_popup_form.className = 'form';

    // Labels, inputs, and submit button all nested within form.
    let title_label = document.createElement('label');
    title_label.setAttribute('for', 'title');
    title_label.id = 'title_label';
    title_label.textContent = 'Title:';
    let title_input = document.createElement('input');
    title_input.type = 'text';
    title_input.id = 'title';
    title_input.placeholder = 'Halo: Primordium';
    title_input.name = 'title';
    title_input.required = true;


    let author_label = document.createElement('label');
    author_label.setAttribute('for', 'author');
    author_label.id = 'author_label';
    author_label.textContent = 'Author:';
    let author_input = document.createElement('input');
    author_input.type = 'text';
    author_input.id = 'author';
    author_input.placeholder = 'Greg Bear';
    author_input.name = 'author';
    author_input.required = true;

    let page_count_label = document.createElement('label');
    page_count_label.setAttribute('for', 'page_count');
    page_count_label.id = 'page_count_label';
    page_count_label.textContent = 'Page Count:';
    let page_count_input = document.createElement('input');
    page_count_input.type = 'text';
    page_count_input.id = 'page_count';
    page_count_input.placeholder = '384';
    page_count_input.name = 'page_count';
    page_count_input.required = true;

    let year_published_label = document.createElement('label');
    year_published_label.setAttribute('for', 'year_published');
    year_published_label.id = 'year_published_label';
    year_published_label.textContent = 'Year Published:';
    let year_published_input = document.createElement('input');
    year_published_input.type = 'text';
    year_published_input.id = 'year_published';
    year_published_input.placeholder = '2012';
    year_published_input.name = 'year_published';
    year_published_input.required = true;

    let submit_new_book_button = document.createElement('button');
    submit_new_book_button.type = 'submit';
    submit_new_book_button.id = 'submit_new_book_popup_form';
    submit_new_book_button.textContent = 'Submit';

    form_elements.push(title_label, title_input, author_label, author_input, page_count_label, page_count_input,
        year_published_label, year_published_input, submit_new_book_button);


    for (let index = 0; index < form_elements.length; index++) {

        item = form_elements[index];
        new_book_popup_form.appendChild(item);

    }

    new_book_popup_div.appendChild(new_book_popup_form);

    return {

        'new_book_pop_div': new_book_popup_div,
        'submit_new_book_button': submit_new_book_button,
    };

}

function add_book_to_library(title, author, page_count, year_published) {

    /*

    Builds a new book and adds it
    to the library collection.

    */

    let new_book = new Book(title, author, page_count, year_published, read = false);
    library_collection.push(new_book);
    return new_book;

}



function mark_book_as_read_book(id, readTextElement) {

    /*

    Marks the book with the supplied
    ID as 'read' and changes the text
    element supplied to 'true';

    */

    for (let index = 0; index < library_collection.length; index++) {

        let book = library_collection[index];

        if (book.book_id == id) {

            book.read = true;
            readTextElement.textContent = `Read: ${book.read}`;

        }
    }

}

function mark_book_as_unread_book(id, unreadTextElement) {

    /*

    Marks the book with the supplied
    ID as 'unread' and changes the text
    element supplied to 'false';

    */

    for (let index = 0; index < library_collection.length; index++) {

        let book = library_collection[index];

        if (book.book_id == id) {

            book.read = false;
            unreadTextElement.textContent = `Read: ${book.read}`;

        }
    }

}


function remove_book(id) {

    /*

    Removes the book with the supplied
    ID from the library collection
    and display area.

    */

    let element_id = 'book_entry' + String(id);
    
    // First we remove the book from the display.
    let book_entry = document.getElementById(element_id);
    library_collection_display_area.removeChild(book_entry);

    // With the book off the screen, remove it from the storage array.
    for (let index = 0; index < library_collection.length; index++) {

        let book = library_collection[index];
        let book_id = book.book_id;

        // Use the shift method if the book is first in the library collection array.
        if (book_id == id && index == 0) {

            library_collection.shift();
        }

        // Use the pop method if the book is last in the library collection array.
        else if (book_id == id && index == library_collection.length - 1) {

            library_collection.pop();
        }

        // Otherwise, splice the array to remove the book.
        else if (book_id == id) {

            library_collection.splice(index, 1)
        }
    }
    

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
    let read = book.read;
    let id = book.book_id;

    let book_entry = document.createElement('div');
    book_entry.className = 'book_entry';
    book_entry.id = `book_entry${id}`;
    
    let book_title = document.createElement('div');
    book_title.className = 'book_title';
    let book_title_header = document.createElement('h4');
    book_title_header.textContent = `Title: ${title}`;
    book_title.appendChild(book_title_header);
    book_elements.push(book_title);

    let book_author = document.createElement('div');
    book_author.className = 'book_author';
    let book_author_header = document.createElement('h4');
    book_author_header.textContent = `Author: ${author}`;
    book_author.appendChild(book_author_header);
    book_elements.push(book_author);

    let book_page_count = document.createElement('div');
    book_page_count.className = 'book_page_count';
    let book_page_count_header = document.createElement('h4');
    book_page_count_header.textContent = `Page Count: ${page_count}`;
    book_page_count.appendChild(book_page_count_header);
    book_elements.push(book_page_count);

    let book_year_published = document.createElement('div');
    book_year_published.className = 'book_year_published';
    let book_year_published_header = document.createElement('h4');
    book_year_published_header.textContent = `Year Published: ${year_published}`;
    book_year_published.appendChild(book_year_published_header);
    book_elements.push(book_year_published);

    let book_read = document.createElement('div');
    book_read.className = 'book_read';
    let book_read_header = document.createElement('h4');
    book_read_header.textContent = `Read: ${read}`;
    book_read.appendChild(book_read_header);
    book_elements.push(book_read);
    
    let delete_book = document.createElement('img');
    delete_book.className = 'delete_book';
    delete_book.id = `delete_book${id}`;
    delete_book.src = './images/trash3-fill.svg';

    let read_book = document.createElement('img');
    read_book.className = 'read_book';
    read_book.id = `read_book${id}`;
    read_book.src = './images/bookmark-check-fill.svg';

    let unread_book = document.createElement('img');
    unread_book.className = 'unread_book';
    unread_book.id = `unread_book${id}`;
    unread_book.src = './images/bookmark-x.svg';

    unread_book.addEventListener('click', () => {

        mark_book_as_unread_book(id, book_read_header);

    });

    read_book.addEventListener('click', () => {

        mark_book_as_read_book(id, book_read_header);

    });

    delete_book.addEventListener('click', () => {

        remove_book(id);
    });

    book_elements.push(delete_book);
    book_elements.push(read_book);
    book_elements.push(unread_book);


    // Add all book elements into book entry.
    for (let index = 0; index < 8; index++) {

        book_entry.appendChild(book_elements[index]);

    }

    // Book entry is now a blob of all book info for a single book that can be placed on the HTML page.
    library_collection_display_area.appendChild(book_entry);

}

function clear_screen() {

    /*

    Clears the screen of all book entries
    without removing the books from the
    library collection (array).

    */

    while (library_collection_display_area.hasChildNodes()){

        library_collection_display_area.removeChild(library_collection_display_area.firstChild)

    }
}

function display_library_collection(read = false) {

    /*

    Displays the entire library collection.
    An optional parameter allows the collection
    to only display non-read books

    */

    clear_screen(); // We clear the screen and then display books so as to avoid displaying duplicates.

    for (let index = 0; index < library_collection.length; index++) {

        let book = library_collection[index];

        if (read == false && book.read == false) {

            display_book_on_page(book);

        }

        else {

            display_book_on_page(book);
        }

    }
}

function retrieveFieldValue(field_id) {

    /*

    Returns the field value from the given field id.

    */

    return document.getElementById(field_id).value;

}

function remove_loading_element(loading_message, loading_circle, seconds) {

    /*

    Removes a loading element from the page
    simulating the completion of
    adding an element to the library.

    */

    // Convert to milliseconds as required by setTimeout().
    seconds = seconds * 1000

    setTimeout(() => {

        library_page.removeChild(loading_message);
        library_page.removeChild(loading_circle);
    }, seconds);


}

show_all_books_button.addEventListener('click', () => {

    display_library_collection();
});

show_read_books_button.addEventListener('click', () => {

    display_library_collection(true);
});

add_book_to_library_button.addEventListener('click', () => {

    let new_book_form_and_button = add_new_book_popup_form();
    let new_book_popup_form = new_book_form_and_button['new_book_pop_div'];
    let submit_button = new_book_form_and_button['submit_new_book_button'];
    submit_button.addEventListener('click', (e) => {

        let title = retrieveFieldValue('title');
        let author = retrieveFieldValue('author');
        let page_count = retrieveFieldValue('page_count');
        let year_published = retrieveFieldValue('year_published');
        let new_book = add_book_to_library(title, author, page_count, year_published);
        new_book_popup_form.remove();
        e.preventDefault();
        let loading_circle = document.createElement('div');
        loading_circle.className = "loading_circle";
        let loading_message_element = document.createElement('p');
        loading_message_element.id = 'loading_message_element';
        loading_message_element.setAttribute('style', 'font-size: large; color: azure;');
        let loading_message = `Adding ${title} to the library collection...`;
        loading_message_element.textContent = loading_message;
        library_page.appendChild(loading_message_element);
        library_page.appendChild(loading_circle);
        remove_loading_element(loading_message_element, loading_circle, 3);
        setTimeout(() => {

            display_book_on_page(new_book);

        }, 3000);

    });
    
    new_book_popup_form.classList.add('open');
    library_page.appendChild(new_book_popup_form);

});


