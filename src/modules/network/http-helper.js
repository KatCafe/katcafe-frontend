const fetch = require('node-fetch');
const consts = require('consts/consts');

class HttpHelper {

    async fetchPromise(address, options, json = true){

        const out = await fetch(address, options);

        return json ? out.json() : out;
    }

    async post(address, body, prefix = consts.serverApi, json , timeout = 10000, headers = { 'User-Agent': 'Request-Promise' } ){

        return this.fetchPromise(prefix + address, {
            headers,
            json,
            timeout,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }, json);

    }

    async get(address, body, prefix = consts.serverApi, json , timeout= 10000 , headers = { 'User-Agent': 'Request-Promise' } ){

        return this.fetchPromise(prefix + address, {
            headers,
            json,
            timeout,
            body: body ? JSON.stringify(body) : undefined,
        }, json);

    }

}

export default HttpHelper;