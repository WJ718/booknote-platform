const {Post, User, Book} = require('../models');

exports.getAllPost = async () => {
    return await Post.findAll({
        include: [Book, User],
        order: [['createdAt', 'DESC']]
    });
};