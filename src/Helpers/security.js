const crypto = require('crypto');
const algorithm = process.env.ALGORITHM; //aes-256-cbc
const key = process.env.KEY; //crypto.randomBytes(32)
// const iv = process.env.IV; //crypto.randomBytes(16) 

module.exports = {
    encrypt: (text) => {
        var chipher = crypto.createCipher(algorithm, key);
        var str = chipher.update(text, 'utf8', 'hex');
        str += chipher.final('hex');

        return str;
    },
    decrypt: (text) => {
        var decipher = crypto.createDecipher(algorithm, key);
        var str = decipher.update(text, 'hex', 'utf8');
        str += decipher.final('utf8');
        return str;
    }
}