const { sequelize } = require('../sequelize');

const User = require('./user');
const UserAbility = require('./userability.js');


const initModels = () => {
    const models = {

        User: User.initModel(sequelize),
        UserAbility: UserAbility.initModel(sequelize),
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