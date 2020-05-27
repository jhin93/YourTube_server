require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const resourceRouter = require('./routes/resource');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret')); // 'secret' -> signed cookies 파싱 지원
app.use(
  cors({
    origin: ['http://localhost:3000'], // 클라이언트 배포되면 S3 엔드포인트 추가하기
    method: ['GET', 'POST'], // 좋아요 취소 기능 구현시 DELETE 추가하기
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET, // used to sign the session ID cookie.
    resave: false,
    saveUninitialized: true,
  }),
);

app.use('/resource', resourceRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 4611;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
