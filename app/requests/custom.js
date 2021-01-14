const {Op} = require('sequelize');
const db = require('../../database/db').sequelize;

module.exports = {
    required: value => {
        switch (typeof value) {
            case "number":
                return !(value === undefined);
            case "string":
                return !(value === "");
            case "object":
                return !(value === null);
        }
        return false;
    },
    passwordConfirmed: (value, {req}) => {
        return value === req.body.confirm_password;
    },
    unique: (field, Model) => {
        return async (value, {req}) => {
            const id = parseInt(req.params.id) || 0;
            await Model.count({
                where: {
                    [Op.and]: [
                        db.where(db.col(field), value),
                        {
                            id: {
                                [Op.ne]: id
                            },
                        }
                    ]
                }
            }).then(data => {
                if(data !== 0){
                    return Promise.reject();
                }
            });
        }
    },
};