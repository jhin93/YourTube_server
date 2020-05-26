const request = require('request');
const { users } = require('../../models');
const crypto = require('crypto');
const { util } = require('../../controller');

function getRefreshToken(token, req, res, flag) {
  let refreshOption = {
    uri: 'accounts.google.com/o/oauth2/token',
    formData: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: token,
      grant_type: 'refresh_token',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request.post(refreshOption, (err, body) => {
    if (err || flag == true)
      res.json({ code: 404, message: 'token has expired redirect to login' });
    // * 사실 유저를 다시 로그인페이지로 리디렉션 시켜야합니다.
    else {
      flag = true;
      body = JSON.parse(body);
      req.cookies.accessToken = util.aes256CTREncrypt(body.access_token);
      req.cookies.maxAge = 3600;
    }
  });
}

module.exports = {
  get: async (req, res) => {
    // * 토큰 갱신 여부
    let hasRefreshed = false;

    // * 헤더에 접근, 갱신토큰 정보가 들어있다고 가정하고 작업합니다.
    // ! 작성자 KAIDO
    const { accessToken, refresh_Token } = req.cookies;

    // * 토큰 만료임박
    if (req.cookies.maxAge < 240)
      getRefreshToken(refresh_Token, req, res, hasRefreshed);

    //* 토큰 디코딩
    accessToken = util.aes256CTRDecrypt(accessToken);

    //*유튜브 데이터 요청 옵션
    let playlistOption = {
      uri: 'https://www.googleapis.com/youtube/v3/playlistItems',
      qs: {
        part: 'snippet',
        mine: true,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    // * 리퀘스트 콜백함수
    let playlistCallback = (err, body, req, res) => {
      if (err) {
        console.log(err);
        // * 이떤 이유라던지 서버의 요청이 반려가 되면 그 유저의 채널 ID를 이용하여 갱신 토큰을 가져옵니다.

        // * 토큰 갱신을 시도합니다.
        getRefreshToken(refresh_token, req, res, hasRefreshed);

        // *이후 마지막으로 다시 데이터를 요청합니다.
        request.get(playlistOption, () => {
          //* 그래도 데이터에 오류가 있으면
          if (err) {
            //* 로그인 페이지로 리디렉션을 요청합니다.
            res.json({
              code: 404,
              message: 'information not available. redirect to login',
            });
            // *이경우에는 토큰을 갱신하여 데이터를 가져오는데 성공한 경우입니다.
          } else res.send(body);
        });
        // * 이경우는 401,403등 초기 에러없이 데이터를 가져오는데 성공한 경우입니다.
      } else {
        res.send(body);
      }
    };

    // * 유튜브 서버의 응답을 기다립니다.
    request.get(playlistOption, playlistCallback);
  },
  post: (req, res) => {
    res.send('videoController-post');
    // todo ElasticSearch 엔진에 REST API를 이용하여 검색후 데이터 전송 예정. - ! KAIDO
  },
};
