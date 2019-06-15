const socketIo = require('socket.io-client');

export default class NodeClient{

    constructor(address) {

        this._socket = socketIo(address);

        this._socket.on('connect', () => {
            console.log("connected");
        });

        this._socket.on('disconnect', ()=>{
            console.log("disconnected");
        });

        this.on = this._socket.on.bind(this._socket);
        this.once = this._socket.once.bind(this._socket);
        this.emit = this._socket.emit.bind(this._socket);

    }


}