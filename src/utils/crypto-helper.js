let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}

class CryptoHelper {

    dsha256(data, secret ){
        return this.sha256( this.sha256(data, secret), secret);
    }

    sha256(data, secret ){

        const sha256 = secret ? crypto.createHmac('sha256', secret  ) : crypto.createHash('sha256');

        const hash = sha256.update(data).digest();

        return hash;

    }


}

export default new CryptoHelper();