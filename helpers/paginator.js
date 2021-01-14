const dotenv = require('dotenv');
dotenv.config();
module.exports = async (Model, req, transformer) => {
    const limit = parseInt(req.query.limit) || process.env.LIMIT;
    const page = parseInt(req.query.page) || 1;
    const offset = ((page - 1) * limit >= 0) ? (page - 1) * limit : 0;
    const users = await Model.findAll({ offset: offset, limit: limit });
    const total = await Model.count();
    const totalPage = Math.ceil(total/limit);
    const prevPage = page === 1 ? 1 : page-1;
    const nextPage = page === totalPage ? totalPage : page+1;
    return {
        limit: limit,
        page: page,
        total_page:totalPage,
        total_record: total,
        page_total_record: users.length,
        offset: offset,
        prev_page: prevPage,
        next_page: nextPage,
        records: transformer(users),
    }
};