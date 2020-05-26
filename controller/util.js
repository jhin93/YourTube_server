const crypto = require('crypto');

module.exports = {
  aes256CTREncrypt: (string) => {
    let key = crypto
      .createHash('sha512')
      .update(process.env.KEY_FROM)
      .digest('hex')
      .slice(0, 32);

    let iv = crypto
      .createHash('sha512')
      .update(process.env.KEY_IV)
      .digest('hex')
      .slice(0, 16);

    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
    let result = cipher.update(string, 'utf8', 'hex'); // 'HbMtmFdroLU0arLpMflQ'
    result += cipher.final('hex');

    return result;
  },
  aes256CTRDecrypt: (string) => {
    let key = crypto
      .createHash('sha512')
      .update(process.env.KEY_FROM)
      .digest('hex')
      .slice(0, 32);

    let iv = crypto
      .createHash('sha512')
      .update(process.env.KEY_IV)
      .digest('hex')
      .slice(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
    let result = decipher.update(string, 'hex', 'utf8');
    result += decipher.final('utf8');

    return result;
  },
};
