import io from 'socket.io-client';
import consts from "consts/consts"

const socket = io(consts.serverApi);

socket.on("connect",()=>{
    console.log("connected");
})

export default socket;