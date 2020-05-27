require('dotenv').config();
require('colors');
const request = require('request-promise-native');

// const util = require('../util.js');
const og = require('../optionGenerator');
const { log } = console;

module.exports = async (req, res) => {
  const { authCode } = req.body;
  if (!authCode) {
    return res.status(400).send('Need Authorization Code');
  }
  log('Authorization code: '.green, authCode);

  const tokenRequestOptions = og.googleTokenRequestOptions(authCode);

  request(tokenRequestOptions)
    .then(async tokens => {
      // log('Permission: '.green, tokens);
      const { access_token, expires_in, refresh_token } = JSON.parse(tokens);

      const profileRequestOptions = og.googleProfileRequestOptions(access_token);

      await request(profileRequestOptions)
        .then(profile => {
          // log('Profile: '.cyan, profile);
          const { email, name, picture } = JSON.parse(profile);
          req.session.profile = { email, name, picture };
        })
        .catch(err => {
          log('Error at profile request in auth.js: '.red, err);
        });

      // 로그인 검증 세션 생성
      req.session.accessToken = {
        value: access_token,
        maxAge: expires_in * 1000, // expires 속성은 과거 브라우저용 (maxAge vs expires)
      };
      req.session.refreshToken = { value: refresh_token };
      // 쿠키 생성 및 응답
      res
        .status(200)
        .cookie(
          'accessToken',
          access_token, // 나중에 토큰 암호화하기 `Bearer ${util.aes256CTREncrypt(access_token)}`
          {
            maxAge: expires_in * 1000, // second to millisecond
            // maxAge: 60000, // set 30s for testing
            // httpOnly: true,
            // domain: 'http://localhost:3000', // S3 배포시 해당 엔드포인트로 변경
            // signed: true, // more secure
          },
        )
        .send('Success');
    })
    .catch(err => {
      log('Error at tokens request in auth.js: '.red, err);
      res.status(400).send({ error: err.code }); // 에러 코드는 시간나면 파보기
    });
};
