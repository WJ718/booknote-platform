const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const {sequelize} = require('./models');

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');

dotenv.config();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {httpOnly: true, secure: false}
}));

sequelize.sync({ force: false })  // 최초 개발 시만 사용 (기존 데이터 삭제됨)
  .then(() => {
    console.log('데이터베이스 테이블 생성 완료');
  })
  .catch((err) => {
    console.error('테이블 생성 실패:', err);
  });

// router setting
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// error handler
app.use((req,res,next) => {
    res.render('error', {
        method : req.method,
        url: req.url,
        status: 404
    })
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});


