'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Videos',
      [
        {
          etag: 'inaxQoGcJBG-PsQkB2U89EuB_zg',
          videoId: 'KN5T3KgEcSg',
          channelId: 'LLSeLavjR1tHXn65zXUAznnw',
          title: '흰수염 매드무비(하이라이트) 풀영상',
          description:
            "흰 수염 해적단의 선장. 일명 '세계최강의사나이'. 과거 해적왕 골 D. 로저와 호각을 다투었던 전설적인 해적이다.",
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: 'inaxQoGcJBG-PsQkB2U89EuB_zg',
          videoId: 'KN5T3KgEcSg',
          channelId: 'LLSeLavjR1tHXn65zXUAznnw',
          title: '카이도 매드무비(하이라이트) 풀영상',
          description:
            '백수 해적단의 총독. 사황의 일원. 사람들이 입을 모아 "일대일로 싸우면 카이도겠지!"라고 말하는 육해공 무릇 살아있는 모든 것들 중에서 "최강의 생물"로 불리우는 해적이다.',
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: 'inaxQoGcJBG-PsQkB2U89EuB_zg',
          videoId: 'KN5T3KgEcSg',
          channelId: 'LLSeLavjR1tHXn65zXUAznnw',
          title: '빅맘 매드무비(하이라이트) 풀영상',
          description:
            "빅 맘 해적단의 선장. 사황의 홍일점으로 토트랜드의 여왕이다. 선원들이 부르는 호칭은 '마마'",
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: 'inaxQoGcJBG-PsQkB2U89EuB_zg',
          videoId: 'KN5T3KgEcSg',
          channelId: 'LLSeLavjR1tHXn65zXUAznnw',
          title: '샹크스 매드무비(하이라이트) 풀영상',
          description:
            "빨간 머리 해적단의 대두목(大頭). 바다의 황제라 불리우는 '사황'의 일원. 인상적인 머리색 탓에 '빨간 머리'라고 불린다.",
          thumbnail: 'https://i.ytimg.com/vi/KN5T3KgEcSg/sddefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          etag: 'inaxQoGcJBG-PsQkB2U89EuB_zg',
          videoId: 'KN5T3KgEcSg',
          channelId: 'LLSeLavjR1tHXn65zXUAznnw',
          title: '검은수염 매드무비(하이라이트) 풀영상',
          description:
            '검은수염 해적단의 제독. 최악의 세대의 일원. 본래 흰 수염 해적단 2번대 소속의 전투원이였지만 오랜 기다림과 철두철미할 정도로 치밀한 계획을 통해 무명의 상태에서 검은 수염 해적단을 창단하고 칠무해를 거쳐 정상전쟁에서 흰 수염이 전사한 이후 사황의 자리에 올랐다.',
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
