const {
 Book, books, getAllBook, getBookById, getBookIndex,
} = require('./entity/book');
const ValidationError = require('./error');
const {
 responseSuccess, responseFailed, responseSuccessWithoutMessage, responseSuccessWithoutData,
} = require('./util');

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
            message = `Gagal menambahkan buku. ${error.message}`;
        }else{
            statusCode = 500;
            message = 'Buku gagal ditambahkan';
        }

        return responseFailed(h, message, statusCode);
    }
};

const getAllBooksHandler = (request, h) => {
    const data = {
        books: getAllBook(),
    };
    return responseSuccessWithoutMessage(h, data);
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = getBookById(id);

    if (book === undefined){
        return responseFailed(h, 'Buku tidak ditemukan', 404);
    }

    return responseSuccessWithoutMessage(h, { book: book.getData() });
};

const updateBookByIdHandler = (request, h) => {
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

    const { id } = request.params;

    const book = getBookById(id);

    if (book === undefined){
        return responseFailed(h, 'Gagal memperbarui buku. Id tidak ditemukan', 404);
    }

    try {
        book.update(
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        );

        return responseSuccessWithoutData(h, 'Buku berhasil diperbarui', 200);
    } catch (error) {
        let message;
        let statusCode = 500;
        if(error instanceof ValidationError){
            statusCode = 400;
            message = `Gagal memperbarui buku. ${error.message}`;
        }else{
            statusCode = 500;
            message = 'Buku gagal diperbarui';
        }

        return responseFailed(h, message, statusCode);
    }
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = getBookIndex(id);

    console.log(index);

    if (index === -1){
        return responseFailed(h, 'Buku Gagal Dihapus. Id tidak ditemukan', 404);
    }

    books.splice(index, 1);
    return responseSuccessWithoutData(h, 'Buku berhasil dihapus');
};

module.exports = {
    createBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};
