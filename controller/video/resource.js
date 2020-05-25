const request = require('request');
const { users } = require('../../models');
const crypto = require('crypto');

function getRefreshToken(token, req, res) {
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
    if (err)
      res.json({ code: 404, message: 'token has expired redirect to login' });
    // * 사실 유저를 다시 로그인페이지로 리디렉션 시켜야합니다.
    else {
      body = JSON.parse(body);
      req.cookies.accessToken = crypto.createCipheriv(
        'aes-256-ctr',
        crypto.createPrivateKey(process.env.KEY_FROM),
        process.env.KEY_IV
      );
    }
  });
}

module.exports = {
  get: async (req, res) => {
    //

    // * 헤더에 접근, 갱신토큰 정보가 들어있다고 가정하고 작업합니다.
    // * 사실 아침에
    // ! 작성자 KAIDO
    const { accessToken, refreshToken } = req.cookies;

    //* 토큰 디코딩
    accessToken = crypto.privateDecrypt(
      crypto.createPrivateKey(process.env.KEY_FROM),
      accessToken
    );
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

    let playlistCallback = async (err, body, req, res) => {
      if (err) {
        console.log(err);
        // * 이떤 이유라던지 서버의 요청이 반려가 되면 그 유저의 채널 ID를 이용하여 갱신 토큰을 가져옵니다.
        let user = await users.findOne({
          where: { channelId: req.cookies.id },
        });

        // * 토큰 갱신을 시도합니다.
        getRefreshToken(user.dataValues.refresh_token, req, res);

        // *이후 마지막으로 다시 데이터를 요청합니다.
        request.get(playlistOption, () => {
          //* 그래도 데이터에 오류가 있으면
          if (err) {
            //* 로그인 페이지로 리디렉션을 요청합니다.
            res.json({
              code: 404,
              message: 'information not available. redirect to login',
            });
          } else res.send(body);
        });
      } else {
        res.send(body);
      }
    };

    // * 유튜브 서버의 응답을 기다립니다.
    request.get(playlistOption, playlistCallback);
  },
  post: (req, res) => {
    res.send('videoController-post');
  },
};
