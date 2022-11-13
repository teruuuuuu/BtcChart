import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, MessageBody, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';
  
const WS_PORT = 445;

@WebSocketGateway(WS_PORT, {
    cors: {
      origin: '*',
    },
    namespace: 'socket.io'
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(){}

    private readonly logger = new Logger(EventsGateway.name);

    @WebSocketServer()
    server: Server;

    async handleConnection(client: any) {
        this.logger.debug("connect");
    }

    async handleDisconnect() {
        this.logger.debug("disconnect");
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