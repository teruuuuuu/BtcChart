import React, { useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './style.css';

import { connect } from "socket.io-client";
import { Rate } from './rate';

const socket = connect("ws://localhost:445", {
  reconnectionDelayMax: 10000,
});

export const RateShowHook = (socket:any) => () => {
    const [rate, setRate] = useState(new Rate("", 0, 0, 0, 0, 0, "", "", 0.0));
    socket.on("rate", (data:any) => setRate(data));
    return (
        <div>
            <h3>BTC RATE</h3>
            <table>
                <thead>
                    <tr>
                        <th>channel</th>
                        <th>ask</th>
                        <th>bid</th>
                        <th>high</th>
                        <th>last</th>
                        <th>low</th>
                        <th>symbol</th>
                        <th>timestamp</th>
                        <th>volume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{rate.channel}</td>
                        <td>{rate.ask}</td>
                        <td>{rate.bid}</td>
                        <td>{rate.high}</td>
                        <td>{rate.last}</td>
                        <td>{rate.low}</td>
                        <td>{rate.symbol}</td>
                        <td>{rate.timestamp}</td>
                        <td>{rate.volume}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const RateShow = RateShowHook(socket);


class Root extends React.Component {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
        <div>
            <RateShow/>
        </div>);

    }
}

const root = ReactDOMClient.createRoot(document.getElementById('app')!);
root.render(<Root />);