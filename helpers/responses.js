const translator = require('./translator');

const statuses = {
    200: {status: 'OK', code: 200},
    400: {status: 'Bad Request', code: 400},
    401: {status: 'Not Authorize', code: 401},
    404: {status: 'Not Found', code: 404},
};

module.exports = {
    doneGetItems: (item, itemName = 'items') => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `Done get ${itemName}`, data: item};
    },
    doneGetItem: (item, itemName = 'item') => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `Done get ${itemName}`, data: item};
    },
    doneDeleteItem: (item, itemName = 'item') => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `Done delete ${itemName}`, data: item};
    },
    doneCreateItem: (item, itemName = 'item') => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `${translator('ar')('done_create', { itemName: itemName })}`, data: item};
    },
    doneUpdateItem: (item, itemName = 'item') => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `Done update ${itemName}`, data: item};
    },
    loggedIn: (item) => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `You are logged in successful`, data: item};
    },
    loggedOut: (item) => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `You are logged out successful`, data: item};
    },
    Registered: (item) => {
        return {status: statuses["200"].status, code: statuses["200"].code, message: `You are registered successful`, data: item};
    },
    badRequest: (errors) => {
        return {status: statuses["400"].status, code: statuses["400"].code, message: `Something went wrong`, errors: errors};
    },
    notAuthorize: () => {
        return {status: statuses["401"].status, code: statuses["401"].code, message: `You are not authorize`};
    },
    userNotFound: () => {
        return {status: statuses["400"].status, code: statuses["400"].code, message: `Can't find this user, check email and password`};
    },
    notFound: (itemName = 'item') => {
        return {status: statuses["404"].status, code: statuses["404"].code, message: `Can't find this ${itemName}`};
    },
};