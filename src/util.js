class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

const responseSuccess = (h, responseMessage, responseData, code = 200) => h.response({
    status: 'success',
    message: responseMessage,
    data: responseData,
}).code(code);

const responseFailed = (h, responseMessage, code = 500) => h.response({
    status: 'fail',
    message: responseMessage,
}).code(code);

module.exports = { ValidationError, responseSuccess, responseFailed };
