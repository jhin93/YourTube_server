const request = require('request-promise-native');
const { user } = require('../../models');
module.exports = async (req, res) => {
  if (!req.session.accessToken) res.status(401).send();
  else {
    let { email } = req.cookies.profile;

    let userid = await user.findOne({ where: { email: email } });
    if (!userid.dataValues) res.status(404).send();
    else {
      userid = userid.dataValues.id;

      request
        .post('http://110.14.118.28:9200/rdbms_sync_idx/_search', {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: {
              bool: {
                should: [
                  { match: { title: req.body } },
                  { match: { description: req.body } },
                ],
              },
            },
            _source: [
              'channelid',
              'title',
              'description',
              'thumbnail',
              'userid',
            ],
          }),
        })
        .then((data) => JSON.parse(data))
        .then((data) => {
          //console.log(data.hits.hits); //todo 유저아이디로 걸러내기

          if (data.hits.hits.length === 0)
            res.status(400).send('no match found');
          else {
            let result = [];
            data.hits.hits.forEach((index) => {
              console.log(index);
              if (index._source.userid === userid) result.push(index._source);
            });

            res.status(200).json(result);
          }
        });
    }
  }
};
// '{"query":{"bool":{"should":[{"match":{"description":"윤하"}}],"must":[{"match":{"userid":1}}]}}}'
