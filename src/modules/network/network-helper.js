import socket from "./client-socket"
import consts  from'consts/consts';
import StringHelper from "src/utils/string-helper"

class NetworkHelper {

    constructor(store){
        this._store = store;

        this.post = this.request;
        this.get = this.request;
    }

    request(address, body, json = true, timeout = 20000, includeSession = true ){

        const headers = {};

        if (includeSession ) {

            if (this._store.state.auth.session) headers.session = this._store.state.auth.session.key;
            if (this._store.state.digitalSignature.publicKey) headers.publicKey = this._store.state.digitalSignature.publicKey;

        }

        let timeoutId;

        const timeoutPromise = new Promise( (resolve, reject) =>{

            timeoutId = setTimeout( ()=> {
                //console.error("Error", address, body);
                reject(new Error("Timeout"));
            }, timeout);

        });

        const promise = new Promise( (resolve, reject) => {

            socket.emit(address,{
                body,
                headers,
            }, data => {

                clearTimeout(timeoutId);

                if (typeof data === "object" && data.error )reject(new Error( data.error ) );

                resolve(data)

            });

        });

        return Promise.race([

            promise,
            timeoutPromise,

        ])

    }

}

export default NetworkHelper;