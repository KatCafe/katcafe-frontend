const rp = require('request-promise');
const consts = require('consts/consts');

class NetworkHelper {

    setStore(store){
        this._store = store;
    }

    async post(address, body, prefix = consts.serverApi, json = true, timeout, headers = {  } ){

        headers.session = this._store.state.auth.session ? this._store.state.auth.session.key : undefined;

        return rp({
            uri: prefix + address,
            headers,
            json,
            timeout,
            method: "POST",
            body,
        });

    }

    async get(address, body, prefix = consts.serverApi, json = true, timeout , headers = { } ){

        headers.session = this._store.state.auth.session ? this._store.state.auth.session.key : undefined;

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