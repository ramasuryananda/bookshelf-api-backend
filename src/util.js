const responseSuccess = (h, responseMessage, responseData, code = 200) => h.response({
    status: 'success',
    message: responseMessage,
    data: responseData,
}).code(code);

const responseSuccessWithoutData = (h, responseMessage, code = 200) => h.response({
    status: 'success',
    message: responseMessage,
}).code(code);

const responseSuccessWithoutMessage = (h, responseData, code = 200) => h.response({
    status: 'success',
    data: responseData,
}).code(code);

const responseFailed = (h, responseMessage, code = 500) => h.response({
    status: 'fail',
    message: responseMessage,
}).code(code);

module.exports = {
 responseSuccess, responseFailed, responseSuccessWithoutData, responseSuccessWithoutMessage,
};
