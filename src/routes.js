const { createBookHandler, getAllBook } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: createBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook,
    },
];

module.exports = routes;
