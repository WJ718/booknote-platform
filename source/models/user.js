const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(12),
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: true,
                defaultValue: '익명',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
    }
}