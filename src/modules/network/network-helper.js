const rp = require('request-promise');
const consts = require('consts/consts');

class NetworkHelper {

    async post(address, body, prefix = consts.serverApi, json = true, timeout, headers = { 'User-Agent': 'Request-Promise' } ){

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            method: "POST",
            body,
        });

    }

    async get(address, body, prefix = consts.serverApi, json = true, timeout , headers = { 'User-Agent': 'Request-Promise' } ){

        console.log(prefix+address);

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            body,
        });

    }

}

export default new NetworkHelper();