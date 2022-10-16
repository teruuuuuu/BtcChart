import {Rate} from './rate';

import {createServer} from "http";
import { OrderBook } from './OrderBook';
const httpServer = createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: ["http://localhost:8080", "http://localhost:8081"],
    }
});

io.on("connection",  (socket:any) => {
    console.log("connection connected socket-id" + socket.id);
    socket.join("pub");

    io.on("disconnect",  (reason:any) => {
        console.log("connection disconnect socket-id" + socket.id);
        socket.join(socket.id);
    });
});

httpServer.listen(445);

export function pubRate(rate: Rate) {
    io.sockets.to("pub").emit("rate", rate);
}

export function pubOrderBook(orderbook: OrderBook) {
    io.sockets.to("pub").emit("orderbook", orderbook);
}