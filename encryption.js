var crypto = require('crypto');

var data = 'The implementation of crypto.createCipher() derives keys using the OpenSSL function EVP_BytesToKey with the digest algorithm set to MD5, one iteration, and no salt. The lack of salt allows dictionary attacks as the same password always creates the same key. The low iteration count and non-cryptographically secure hash algorithm allow passwords to be tested very rapidly.';

function getPwdHash(pwd) {
	var h1 = crypto.createHash('sha256');
	var salt = 'biobanque';
	var str = pwd + salt;
	for (i = 0; i < 100; i++) {
		h1.update(str);
	}
	return h1.digest('base64');
}

function getPwdKey(pwd) {
	var h1 = crypto.createHash('sha256');
	var salt = 'database';
	var str = pwd + salt;
	for (i = 0; i < 100; i++) {
		h1.update(str);
	}
	return h1.digest('base64');
}

function encrypt(data, pwd) {
	var cipher = crypto.createCipher('aes192', pwd);
	var encData = cipher.update(data, 'utf8', 'base64');
	encData += cipher.final('base64');
	return encData;
}

function decrypt(encData, pwd) {
	var decipher = crypto.createDecipher('aes192', pwd);
	var data = decipher.update(encData, 'base64', 'utf8');
	data += decipher.final('utf8');
	return data;
}

module.exports = {
	getPwdHash: getPwdHash,
	getPwdKey: getPwdKey,
	encrypt: encrypt,
	decrypt: decrypt
}