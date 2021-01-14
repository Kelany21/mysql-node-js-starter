function transform (data) {
    return {
        id: data.id,
        username: data.username,
        email: data.email,
        is_admin: data.is_admin,
    }
}

module.exports = {
    auth: (obj) => {
        let responseItems = transform(obj);
        responseItems.token = obj.token;
        return responseItems
    },
    item: (obj) => {
        return transform(obj)
    },
    items: (objs) => {
        let responseItems = [];
        for (let obj of objs){
            responseItems.push(transform(obj));
        }
        return responseItems
    },
};