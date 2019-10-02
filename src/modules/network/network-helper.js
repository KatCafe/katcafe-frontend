const rp = require('request-promise');
const consts = require('consts/consts');

class NetworkHelper {

    constructor(store){
        this._store = store;
    }

    async post(address, body, prefix = consts.serverApi, json = true, timeout, headers = { 'User-Agent': 'Request-Promise' }, includeSession ){

        if (includeSession && this._store.state.auth.session) headers.session = this._store.state.auth.session.key;

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            method: "POST",
            body,
        });

    }

    async get(address, body, prefix = consts.serverApi, json = true, timeout , headers = { 'User-Agent': 'Request-Promise' }, includeSession = true ){

        if (includeSession && this._store.state.auth.session) headers.session = this._store.state.auth.session.key;

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            body,
        });

    }

}

export default NetworkHelper;