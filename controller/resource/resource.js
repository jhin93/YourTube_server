require('dotenv').config();
require('colors');
const request = require('request-promise-native');

const util = require('../util');
const og = require('../optionGenerator');
const { Users, Videos } = require('../../models');
const { log } = console;

module.exports = async (req, res) => {
  const { cookies, session } = req;

  log('cookies.accessToken '.yellow, cookies.accessToken);
  log('session.accessToken '.yellow, session.accessToken);
  log('session.refreshToken '.yellow, session.refreshToken);
  log('session.profile '.yellow, session.profile);

  // 토큰이 만료되었을 때 (새로운 토큰 요청 및 발행 로직)
  if (!cookies.accessToken) {
    // 만료되어 쿠키가 없어졌다면
    log('Access token is expired');
    // DB에서 refresh_token 가져와 구글에 access_token 요청
    // getRefreshToken(refresh_Token, req, res, hasRefreshed);
    // ...
    // 일단 확인을 위해 결과 반환
    return res.status(204).send('Your access token has been expired');
  }

  /* 토큰이 아직 유효할 때 */

  // 1. 토큰 복호화
  const access_token = util.aes256CTRDecrypt(cookies.accessToken);

  // 2. 세션 유효성 검사. 유효하지 않다면 클라이언트로 응답 및 함수 종료
  if (!session.accessToken || session.accessToken.value !== access_token) {
    log('Login session not exists');
    return res.status(401).send('Unauthorized');
  }

  /* 토큰 유효 + 세션 유효 */

  // DB에 유저에 해당하는 정보가 있었다면(재요청시), 유저의 비디오 데이터 가져오기
  try {
    const user = await Users.findOne({
      where: { email: session.profile.email },
    });
    const userId = user.get('id');
    const videos = await Videos.findAll({ where: { userId } });
    return res.status(200).json(videos); // DB에 이미 저장된 게 있으면 여기서 종료
  } catch (err) {
    if (err) {
      log(err);
    }
    log('User data not exists'.red);
  }

  // DB에 유저 비디오 리스트가 없으면(첫요청시), 유튜브에 요청 및 응답 데이터 DB에 저장하고, 그 결과를 클라이언트로 응답
  // const access_token = cookies.accessToken;

  /* 필요 데이터 정의 */
  const { name, email, picture } = session.profile;
  const refreshToken = session.refreshToken.value;
  let channelId, likePlaylistId, userId;
  const likedVideos = [];

  // 유투브에서 나의 채널 데이터 가져오기
  const channelRequestOptions = og.youtubeChannelRequestOptions(access_token);

  await request(channelRequestOptions)
    .then((data) => {
      // log('Channel data'.cyan, data);
      const { id, contentDetails } = data.items[0];
      channelId = id;
      likePlaylistId = contentDetails.relatedPlaylists.likes;
      log('channelId: '.yellow, channelId);
      log('myLikePlaylistId: '.yellow, likePlaylistId);
    })
    .catch((err) => {
      log('Error at youtube channel request in resource.js: '.red, err);
    });

  // Users 테이블에 준비된 유저 정보 저장
  await Users.create({
    name,
    email,
    picture,
    channelId,
    likePlaylistId,
    refreshToken,
  })
    .then((user) => {
      userId = user.get('id'); // 생성된 유저의 id 추출해 재할당
    })
    .catch((err) => {
      log('Error at Users.create in resource.js: '.red, err);
    });

  // 유투브에서 좋아요 플레이리스트 데이터 가져오기
  const params = [access_token, 30, likePlaylistId];
  const playlistRequestOptions = og.youtubePlaylistItemsRequestOptions(
    ...params
  );

  await request(playlistRequestOptions)
    .then((data) => {
      // log('Like playlist data: '.cyan, data);
      // items 개수 만큼 객체 생성해 likeVideos에 넣기
      for (let item of data.items) {
        const { etag, snippet } = item;
        const video = {
          userId: userId, // data from Users table
          etag: etag,
          videoId: snippet.resourceId.videoId,
          channelId: snippet.channelId,
          title: snippet.title,
          description:
            snippet.description.length > 100
              ? snippet.description.slice(0, 100) + '...'
              : snippet.description,
          thumbnail: snippet.thumbnails.high.url,
        };
        likedVideos.push(video);
      }
      log('Liked videos: '.rainbow, likedVideos);
    })
    .catch((err) => {
      log('Error at youtube playlist request in resource.js: '.red, err);
    });

  // 준비된 likedVideos 데이터 DB에 저장하고, 성공적으로 저장 되었음이 확인되면 비디오들 클라이언트에 보내기
  Videos.bulkCreate(likedVideos)
    .then((videos) => {
      log('Bulk data insert complete'.rainbow);
      res.status(200).json(videos);
    })
    .catch((err) => {
      log('Error at Videos.bulkCreate in resource.js'.red, err);
      res.sendStatus(500);
    });
};

// function getRefreshToken(token, req, res, flag) {
//   let refreshOption = {
//     uri: 'accounts.google.com/o/oauth2/token',
//     formData: {
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       refresh_token: token,
//       grant_type: 'refresh_token',
//     },
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   };
//   request.post(refreshOption, (err, body) => {
//     if (err || flag == true)
//       res.json({ code: 404, message: 'token has expired redirect to login' });
//     // * 사실 유저를 다시 로그인페이지로 리디렉션 시켜야합니다.
//     else {
//       flag = true;
//       body = JSON.parse(body);
//       req.cookies.accessToken = util.aes256CTREncrypt(body.access_token);
//       req.cookies.maxAge = 3600;
//     }
//   });
// }

// };
// // * 리퀘스트 콜백함수
// let playlistCallback = (err, body, req, res) => {
//   if (err) {
//     console.log(err);
//     // * 이떤 이유라던지 서버의 요청이 반려가 되면 그 유저의 채널 ID를 이용하여 갱신 토큰을 가져옵니다.

//     // * 토큰 갱신을 시도합니다.
//     getRefreshToken(refresh_token, req, res, hasRefreshed);

//     // *이후 마지막으로 다시 데이터를 요청합니다.
//     request.get(playlistOption, () => {
//       //* 그래도 데이터에 오류가 있으면
//       if (err) {
//         //* 로그인 페이지로 리디렉션을 요청합니다.
//         res.json({
//           code: 404,
//           message: 'information not available. redirect to login',
//         });
//         // *이경우에는 토큰을 갱신하여 데이터를 가져오는데 성공한 경우입니다.
//       } else res.send(body);
//     });
//     // * 이경우는 401,403등 초기 에러없이 데이터를 가져오는데 성공한 경우입니다.
//   } else {
//     res.send(body);
//   }
// };

// // * 유튜브 서버의 응답을 기다립니다.
// request.get(playlistOption, playlistCallback);
