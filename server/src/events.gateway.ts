import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import {OrderBook} from './orderbook';
  
const WS_PORT = 445;

@WebSocketGateway(WS_PORT, {
    cors: {
      origin: '*',
    },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private readonly logger = new Logger(EventsGateway.name);
    private sockets: Socket[] = [];

    constructor(){
        this.logger.debug("EventsGateway Start");
    }

    @WebSocketServer()
    server: Server;

    sendOrderBook(orderbook:OrderBook) {
        this.sockets.forEach(socket => {
            socket.emit("orderbook", orderbook);
        })
    }

    async afterInit(server: any) {
        this.logger.debug("websocket init end");
    }

    async handleConnection(socket: Socket) {
        this.logger.debug(`websocket connect: ${socket.id}`);
        this.sockets = this.sockets.concat([socket]);
    }

    async handleDisconnect(socket: Socket) {
        this.logger.debug(`websocket dissconnect: ${socket.id}`);
        this.sockets = this.sockets.filter(s => s.id != socket.id);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any): WsResponse<string> {
        return { event: 'message', data: data };
    }
    

    

    // @SubscribeMessage('connection')
    // handleMessage(@MessageBody() data: any): void {
    //     this.logger.debug("connect");
    // }
}