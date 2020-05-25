const resource = require('./resource');
module.exports = {
  get: (req, res) => {
    res.send('videoController-get');
  },
  post: resource.post,
};
