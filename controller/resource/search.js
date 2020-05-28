const request = require('request');
const { user } = require('../../models');
module.exports = async (req, res) => {
  if (!req.session.accessToken) res.status(401).send();
  else {
    let { email } = req.cookies.profile;

    let userid = await user.findOne({ where: { userId: userid } });
    if (!userid.dataValues) res.status(404).send();
    else {
      userid = userid.dataValues.id;

      let queryData = await request.get(
        'http://110.14.118.28:9200/rdbms_sync_idx/_search',
        {
          query: {
            bool: {
              should: [
                { match: { description: req.body.search } },
                { match: { userid: userid } },
              ],
            },
          },
        }
      );

      res.send(queryData);
    }
  }
};
//http:// 110.14.118.28:9200/rdbms_sync_idx/_search?pretty -H Content-Type:application/json -d '{"query":{"bool":{"should":[{"match":{"description":"윤하"}},{"match":{"userid":1}}]}}}'
