require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const videoRouter = require('./routes/video');
const { userController } = require('./controller');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret')); // 'secret' -> signed cookies 파싱 지원
app.use(
  cors({
    origin: ['http://localhost:3000'], // 클라이언트 배포되면 S3 엔드포인트 추가하기
    method: ['GET', 'POST'], // 좋아요 취소 기능 구현시 DELETE 추가하기
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET, // used to sign the session ID cookie.
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/resource', videoRouter);
app.post('/auth', userController.auth); // 깔끔하게 auth/login, auth/logout으로 하여 직관적으로 하는건 어떨까?
app.post('/deauth', userController.deauth);

const port = process.env.PORT || 4611;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
