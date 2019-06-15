const rp = require('request-promise');
const consts = require('consts/consts');

class NetworkHelper {

    async post(address, body, prefix = consts.serverApi, json = true, timeout ){

        return rp({
            uri: prefix + address,
            headers: { 'User-Agent': 'Request-Promise' },
            json: json,
            timeout: timeout,
            method: "POST",
            body: body
        });

    }

    async get(address, body, prefix = consts.serverApi, json = true, timeout){

        console.log(prefix+address);

        return rp({
            uri: prefix + address,
            headers: { 'User-Agent': 'Request-Promise' },
            json: json,
            timeout: timeout,
            body: body,
        });

    }

}

export default new NetworkHelper();