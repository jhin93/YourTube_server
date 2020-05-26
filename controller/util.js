const crypto = require('crypto');

module.export = {
  aes256CTREncrypt: (req, res) => {
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
    let result = cipher.update(req.body.data, 'utf8', 'hex'); // 'HbMtmFdroLU0arLpMflQ'
    result += cipher.final('hex');

    res.send(result);
  },
  aes256CTRDecrypt: (req, res) => {
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
    let result2 = decipher.update(req.body.data, 'hex', 'utf8');
    result2 += decipher.final('utf8');

    res.send(result);
  },
};
/**
 * let key = new Buffer.alloc(
  32,
  "cass, phone, multibus, china, jupitor, milk, twitch, taobao,"
)
let iv = new Buffer.alloc(
  16,
  "2kjf94hc~0JV*&k23mbnvamno34/DFAbA0O&*((LK"
)
const cipher = crypto.createCipheriv(
  "aes-256-ctr",
  key,
  iv
)
let result = cipher.update(
  "암호화할문장",
  "utf8",
  "base64"
) // 'HbMtmFdroLU0arLpMflQ'
result += cipher.final("base64") // 'HbMtmFdroLU0arLpMflQYtt8xEf4lrPn5tX5k+a8Nzw='

const decipher = crypto.createDecipheriv(
  "aes-256-ctr",
  key,
  iv
)
let result2 = decipher.update(
  result,
  "base64",
  "utf8"
) // 암호화할문 (base64, utf8이 위의 cipher과 반대 순서입니다.)
result2 += decipher.final("utf8") // 암호화할문장 (여기도 base64대신 utf8)

console.log(result, result2)

 */
