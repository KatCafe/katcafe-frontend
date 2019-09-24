const rp = require('request-promise');
const consts = require('consts/consts');

class NetworkHelper {

    setStore(store){
        this._store = store;
    }

    async post(address, body, prefix = consts.serverApi, json = true, timeout, headers = { 'User-Agent': 'Request-Promise' } ){

        if (this._store.state.auth.session) headers.session = this._store.state.auth.session

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            method: "POST",
            body,
            withCredentials: true,
        });

    }

    async get(address, body, prefix = consts.serverApi, json = true, timeout , headers = { 'User-Agent': 'Request-Promise' } ){

        if (this._store.state.auth.session) headers.session = this._store.state.auth.session

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            body,
            withCredentials: true,
        });

    }

}

export default new NetworkHelper();