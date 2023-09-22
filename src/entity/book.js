const { nanoid } = require('nanoid');
const ValidationError = require('../error');

const books = [];

const validate = (name, readPage, pageCount) => {
    if (name === undefined) {
        throw new ValidationError('Mohon isi nama buku');
    }

    if (readPage > pageCount) {
        throw new ValidationError('readPage tidak boleh lebih besar dari pageCount');
    }
};

class Book {
    #id;

    #name;

    #year;

    #author;

    #summary;

    #publisher;

    #pageCount;

    #readPage;

    #finished;

    #reading;

    #insertedAt;

    #updatedAt;

    constructor(
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        ) {
            validate(name, readPage, pageCount);
            this.#name = name;
            this.#year = year;
            this.#author = author;
            this.#summary = summary;
            this.#publisher = publisher;
            this.#pageCount = pageCount;
            this.#readPage = readPage;
            this.#reading = reading;

            const date = new Date().toISOString();

            this.#insertedAt = date;
            this.#updatedAt = date;
            this.#id = nanoid(16);
            this.updateFinished();
    }

    updateFinished() {
        this.#finished = this.#pageCount === this.#readPage;
    }

    getData() {
        return {
            id: this.#id,
            name: this.#name,
            year: this.#year,
            author: this.#author,
            summary: this.#summary,
            publisher: this.#publisher,
            pageCount: this.#pageCount,
            readPage: this.#readPage,
            finished: this.#finished,
            reading: this.#reading,
            insertedAt: this.#insertedAt,
            updatedAt: this.#updatedAt,
        };
    }

    update(
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        ) {
            validate(name, readPage, pageCount);
            this.#name = name;
            this.#year = year;
            this.#author = author;
            this.#summary = summary;
            this.#publisher = publisher;
            this.#pageCount = pageCount;
            this.#readPage = readPage;
            this.#reading = reading;

            this.#updatedAt = new Date().toISOString();
            this.updateFinished();
    }

    getIdNameAndPublisher(){
        return {
            id: this.#id,
            name: this.#name,
            publisher: this.#publisher,

        };
    }
}

const getAllBook = () => books.map((bookData) => bookData.getIdNameAndPublisher());

const getBookById = (id) => books.filter((bookData) => bookData.getData().id === id)[0];

const getBookIndex = (id) => books.findIndex((bookData) => bookData.getData().id === id);

module.exports = {
    books, Book, getBookById, getAllBook, getBookIndex,
};
