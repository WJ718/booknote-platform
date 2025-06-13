const indexService = require('../services/indexService');

exports.renderMain = async (req,res,next) => {
    try {
        const posts = await indexService.getAllPost();
        
        res.render('main', {
            user: req.session.user || undefined,
            posts
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
};

