const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginService = async(id, password,next) => {
    try {
        const exUser = await User.findOne({where : {id}});

        if(!exUser) {
            const err = new Error("존재하지 않는 사용자");
            err.status = 400;
            return next(err);
        } 

        const match = await bcrypt.compare(password, exUser.password);
        if (!match) {
            const err = new Error("비밀번호가 일치하지 않습니다.");
            err.status = 401;
            throw err;
        }
        
        return exUser;
    } catch(err) {
        throw(err);
    }
}

exports.signupService = async (id, password, next) => {
    try {
        const exUser = await User.findOne({where: {id}});

        if(exUser) {
            const err = new Error("이미 존재하는 사용자");
            err.status = 400;
            return next(err);
        }

        console.log(`${id} : 회원가입 요청`);
        const hashed = await bcrypt.hash(password, 10);

        return await User.create({id, password: hashed});
    } catch(err) {
        throw(err);
    }
}

exports.changeNickService = async(nick, userId) => {
    try {
        await User.update(
            {nick},
            {where: {id: userId}}
        );
    } catch(err) {
        throw(err);
    }
}

exports.changePasswordService = async (oldPassword, newPassword, userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });
        const hased = await bcrypt.hash(newPassword, 10);

        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match) {
            const error = new Error('기존 비밀번호가 일치하지 않습니다.');
            error.status = 400;
            throw error;
        }
        await User.update(
            { password: hased },
            { where: { id: userId } }
        );
    } catch (err) {
        throw err;
    }
};