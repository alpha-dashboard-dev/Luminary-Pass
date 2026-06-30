const { sequelize } = require('../sequelize');

const User = require('./user');
const UserAbility = require('./userability');
const Role = require('./roles');
const Permission = require('./permissions');
const RolePermissions = require('./role.permissions');


const initModels = () => {
    const models = {

        User: User.initModel(sequelize),
        UserAbility: UserAbility.initModel(sequelize),
        Role: Role.initModel(sequelize),
        Permission: Permission.initModel(sequelize),
        RolePermissions: RolePermissions.initModel(sequelize),
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