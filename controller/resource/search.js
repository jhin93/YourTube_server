const request = require('request-promise-native')
const { Users } = require('../../models')

module.exports = async (req, res) => {
  let { email } = req.session.profile

  let userid
  try {
    const user = await Users.findOne({ where: { email: email } })
    userid = user.get('id')
  } catch (err) {
    console.log(err)
  }

  if (!userid) return res.status(404).send()
  else {
    request
      .post('http://110.14.118.28:9200/rdbms_sync_idx/_search', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            bool: {
              should: [
                { match: { title: req.body.keyword } },
                { match: { description: req.body.keyword } }
              ]
            }
          }
        }),
        _source: ['channelid', 'title', 'description', 'thumbnail', 'userid']
      })
      .then(data => JSON.parse(data))
      .then(data => {
        // console.log(data.hits.hits); //todo 유저아이디로 걸러내기

        if (data.hits.hits.length === 0) res.status(400).send('no match found')
        else {
          let result = []
          data.hits.hits.forEach(index => {
            result.push(index._source)
          })

          res.status(200).json(result)
        }
      })
  }
}
// '{"query":{"bool":{"should":[{"match":{"description":"윤하"}}],"must":[{"match":{"userid":1}}]}}}'
