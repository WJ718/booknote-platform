const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            }, 
            author: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            publisher: {
                type: Sequelize.STRING(100),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Book',
            tableName: 'books',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Book.hasMany(db.Post); // post.bookid(FK)
    }
}