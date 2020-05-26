require('dotenv').config();
require('colors');
const { log } = console;
const util = require('../util.js');
const request = require('request-promise-native');

module.exports = async (req, res) => {
  const { authCode } = req.body;
  if (!authCode) {
    return res.status(400).send('Need Authorization Code');
  }
  log('Authorization code: '.green, authCode);

  const tokenRequestOptions = generateTokenRequestOptions(authCode);

  request(tokenRequestOptions)
    .then((tokens) => {
      log('Permission: '.green, tokens);
      const { access_token, expires_in, refresh_token } = JSON.parse(tokens);

      // [옵션] 프로필 데이터 필요할 때를 대비해 추가함
      const profileRequestOptions = generateProfileRequestOptions(access_token);

      request(profileRequestOptions)
        .then((profile) => {
          log('Profile: '.cyan, profile);
          const { email, name, picture } = JSON.parse(profile);
          // DB에 저장할 User 데이터. 일단 session(메모리)에 저장하고,
          // resource 컨트롤러에서 채널 데이터와 함께 필요한 것만 DB에 저장한다.
          // DB에 저장되면, userInfo 프로퍼티에 null을 할당하여 GC한다.
          req.session.userInfo = { email, name, picture, refresh_token };
        })
        .catch((err) => {
          log('Error at profile request in auth.js: '.red, err);
        });

      // 로그인 세션 생성
      req.session.accessToken = {
        value: access_token,
        maxAge: expires_in * 1000, // expires 속성은 과거 브라우저용 (maxAge vs expires)
      };
      // 쿠키 생성 및 응답
      console.log(access_token);
      console.log(util.aes256CTREncrypt(access_token));
      res
        .status(200)
        .cookie(
          'access_token',
          `Bearer ${util.aes256CTREncrypt(access_token)}`, // 토큰 암호화
          {
            maxAge: expires_in * 1000, // second to millisecond
            httpOnly: true,
            domain: 'http://localhost:3000', // S3 배포시 해당 엔드포인트로 변경
            signed: true, // more secure
          }
        )
        .send('Success');
    })
    .catch((err) => {
      log('Error at tokens request in auth.js: '.red, err);
      res.status(400).send({ error: err.code }); // 에러 코드는 시간나면 파보기
    });
};

var generateTokenRequestOptions = (AUTH_CODE) => {
  return {
    method: 'POST',
    url: 'https://accounts.google.com/o/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'authorization_code',
      code: AUTH_CODE,
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.OAUTH_REDIRECT_URL, // 주의! URL이 Google API console에 미리 등록되어 있어야 하고, 리액트 라우팅 주소와도 동일해야함
    },
  };
};

var generateProfileRequestOptions = (ACCESS_TOKEN) => {
  return {
    method: 'GET',
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
  };
};
