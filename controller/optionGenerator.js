module.exports = {
  googleTokenRequestOptions: auth_code => {
    return {
      method: 'POST',
      url: 'https://accounts.google.com/o/oauth2/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: {
        grant_type: 'authorization_code',
        code: auth_code,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.OAUTH_REDIRECT_URL, // 주의! URL이 Google API console에 미리 등록되어 있어야 하고, 리액트 라우팅 주소와도 동일해야함
      },
    };
  },
  googleTokenRefreshRequestOptions: refresh_token => {
    return {
      method: 'POST',
      url: 'accounts.google.com/o/oauth2/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
      },
    };
  },
  googleProfileRequestOptions: access_token => {
    return {
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      headers: { authorization: `Bearer ${access_token}` },
    };
  },
  youtubeChannelRequestOptions: access_token => {
    return {
      method: 'GET',
      uri: 'https://www.googleapis.com/youtube/v3/channels',
      qs: {
        part: 'contentDetails',
        mine: true,
      },
      headers: { authorization: `Bearer ${access_token}` },
      json: true,
    };
  },
  youtubePlaylistItemsRequestOptions: (access_token, max_number, playlist_id) => {
    return {
      method: 'GET',
      uri: 'https://www.googleapis.com/youtube/v3/playlistItems',
      qs: {
        part: 'snippet',
        maxResults: max_number,
        playlistId: playlist_id,
      },
      headers: { authorization: `Bearer ${access_token}` },
      json: true,
    };
  },
};
