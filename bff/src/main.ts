import {Rate} from './rate';

import {WebSocket} from 'ws';
import { pubRate } from './pub';

// レート取得ようWebSocket
const ws = new WebSocket("wss://api.coin.z.com/ws/public/v1");

ws.on("open", () => {
    console.log("open");
    const message = JSON.stringify(
    {
        "command": "subscribe",
        "channel": "ticker",
        "symbol": "BTC"
    });
    ws.send(message);
});

ws.on("message", (data:any) => {
    const jsonStr: string = data.toString();
    const rate:Rate = JSON.parse(jsonStr);
    pubRate(rate);
    console.log(rate);
});

