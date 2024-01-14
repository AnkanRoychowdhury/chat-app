const { Server }  = require('socket.io');
const Redis = require('ioredis');
const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USER } = require('../config/serverConfig');

const pub = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USER,
    password: REDIS_PASSWORD
});
const sub = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USER,
    password: REDIS_PASSWORD
});

class SocketService {

    constructor(){
        this.io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });
        sub.subscribe("MESSAGES");
    }

    initListeners(){
        console.log('Init Socket Listeners...')
        this.io.on('connect', (socket) => {
            console.log(`New Socket connection => ${socket.id}`);
            // On event emit from client
            socket.on('event:message', async({message, socketId}) => {
                console.log(`New Message received => ${message} from ${socketId}`);
                await pub.publish("MESSAGES", JSON.stringify({ message, socketId }));
            });
            socket.on('disconnect', () => {
                console.log(`Socket connection disconnecting... => ${socket.id}`);
            })
        });
        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGES'){
                console.log(`Message received from redis => ${message}`);
                this.io.emit('message', message);
            }
        });
    }

}

module.exports = SocketService;