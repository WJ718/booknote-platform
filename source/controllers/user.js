const userService = require('../services/userService');
const indexService = require('../services/indexService');

exports.login = async (req,res,next) => {
    const {id, password} = req.body;
    try {
        const user = await userService.loginService(id, password, next);
        if(!user) return;

        req.session.user = user;
        console.log(`${req.session.user.id} - 로그인 요청 성공`);
        res.redirect('/');        
    } catch(err) {
        next(err);
    }
}

exports.logout = (req, res, next) => {
  if (req.session.user) {
    delete req.session.user.password; 
    req.session.user = null;
  }
  res.redirect('/');
};


exports.signup = async (req,res,next) => {
    const {id, password} = req.body;
    try {
        const user = await userService.signupService(id, password, next);
        req.session.user = user;
        console.log(`${req.session.user.id} - 회원가입 요청 성공`);
        res.redirect('/');
    } catch(err) {
        next(err);
    }
}

exports.renderSetting = async (req,res,next) => {
    try {
        res.render('setting', {
            user: req.session.user || undefined
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
};

exports.changeNick = async (req,res,next) => {
    const {nick} = req.body;
    const userId = req.session.user.id;
    try {
        await userService.changeNickService(nick, userId);
        console.log(`${nick} - 정보 수정 요청 성공`)
        
        req.session.user.nick = nick;

        res.redirect('/user/setting');
    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.changePassword = async (req,res,next) => {
    try {
        const {currentPassword, newPassword } = req.body;
        const userId = req.session.user.id;
        await userService.changePasswordService(currentPassword, newPassword, userId);
        console.log(`${req.session.user.nick} - 비밀번호 수정 요청 성공`)

        res.redirect('/user/setting')
    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.myPosts = async (req,res,next) => {
    const posts = await indexService.getAllPost();

    try {
        res.render('my-post', {
            user: req.session.user || undefined,
            posts
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
}