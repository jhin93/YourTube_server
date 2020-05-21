'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Videos',
      [
        {
          etag: null,
          videoId: 'KN5T3KgEcSg',
          title: '흰수염매드무비(하이라이트) 풀영상',
          description:
            '정상결전 세계최강사나이 흰수염매드무비(하이라이트)풀영상',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: null,
          videoId: 'KN5T3KgEcSg',
          title: '흰수염매드무비(하이라이트) 풀영상',
          description:
            '정상결전 세계최강사나이 흰수염매드무비(하이라이트)풀영상',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: null,
          videoId: 'KN5T3KgEcSg',
          title: '흰수염매드무비(하이라이트) 풀영상',
          description:
            '정상결전 세계최강사나이 흰수염매드무비(하이라이트)풀영상',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: null,
          videoId: 'KN5T3KgEcSg',
          title: '흰수염매드무비(하이라이트) 풀영상',
          description:
            '정상결전 세계최강사나이 흰수염매드무비(하이라이트)풀영상',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: null,
          videoId: 'KN5T3KgEcSg',
          title: '흰수염매드무비(하이라이트) 풀영상',
          description:
            '정상결전 세계최강사나이 흰수염매드무비(하이라이트)풀영상',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videos', null, {});
  },
};
