const { sequelize } = require('../sequelize');

const User = require('./user');


const initModels = () => {
    const models = {

        User: User.initModel(sequelize),
    };

    Object.values(models).forEach((model) => {
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

    return {
        sequelize,
        ...models,
    };
};

module.exports = initModels;