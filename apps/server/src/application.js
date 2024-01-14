const http = require('http');
const express = require('express');
const SocketService = require('./services/socket');
const cors = require('cors');

const PORT = process.env.PORT ? process.env.PORT : 8000

class Application {

    listen(){
        this.httpServer.listen(PORT, () => {
            console.log(`HTTP Server started on PORT: ${PORT}`);
        });
    }

    useMiddlewares(){
        this.app.use(cors());
    }

    async main(){
        const socketService = new SocketService();
        socketService.initListeners();
        this.app = express();
        this.httpServer = http.createServer(this.app);
        socketService.io.attach(this.httpServer);
        this.useMiddlewares();
        this.listen();
    }
}

module.exports = Application;