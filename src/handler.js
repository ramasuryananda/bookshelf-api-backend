const { Book, books } = require('./entity/book');
const { ValidationError, responseSuccess, responseFailed } = require('./util');

const createBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    try {
        const book = new Book(
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        );

        books.push(book);
        return responseSuccess(h, 'Buku berhasil ditambahkan', {
            bookId: book.getData().id,
        }, 201);
    } catch (error) {
        let message;
        let statusCode = 500;
        if(error instanceof ValidationError){
            statusCode = 400;
            message = error.message;
        }else{
            statusCode = 500;
            message = 'Buku gagal ditambahkan';
        }

        return responseFailed(h, message, statusCode);
    }
};

module.exports = { createBookHandler };
