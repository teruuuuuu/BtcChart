
import React from 'react';

import {useSelector} from 'react-redux';
import { OrderBook } from "../type/OrderBook";

import {RootState} from '../store/Store';
import { useElementSize } from 'usehooks-ts'

const MIN_MS = 600000;
const HOUR_MS = 3600000;

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function timeX(chartWidth: number, chartX: number, startTime: Date, time: Date) {
    return ((time.getTime() - startTime.getTime()) / HOUR_MS) * chartWidth + chartX;
}

function priceY(chartHeight: number, priceCenterY: number, priceWidth: number, priceCenter: number, price: number) {
    return priceCenterY + (chartHeight / 2) * (price - priceCenter) / priceWidth;
}

function circleRend(upperLeft: Point, bottomRight: Point) {
    return (
    <>
        <line x1={upperLeft.x} y1={upperLeft.y} x2={upperLeft.x} y2={bottomRight.y} strokeWidth={2} stroke="#fff" />
        <line x1={upperLeft.x} y1={bottomRight.y} x2={bottomRight.x} y2={bottomRight.y} strokeWidth={2} stroke="#fff" />
        <line x1={bottomRight.x} y1={bottomRight.y} x2={bottomRight.x} y2={upperLeft.y} strokeWidth={2} stroke="#fff" />
        <line x1={bottomRight.x} y1={upperLeft.y} x2={upperLeft.x} y2={upperLeft.y} strokeWidth={2} stroke="#fff" />
    </>);
}


function timeString(date: Date) {
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
}

export const BtcChartView = () => {
    const orderBooks = useSelector((state:RootState) => state.orderbook.data.slice().reverse());
    const [squareRef, elmRect] = useElementSize();

    const svgWidth = Math.max(0, elmRect.width - 10);
    const svgHeight = elmRect.height;
    const margin = 5;
    const timeY = svgHeight - 40;
    const priceX = svgWidth - 100;
    
    const chartX = margin;
    const chartY = margin;
    const chartWidth = priceX - chartX;
    const chartHeight = timeY - chartY;

    const upperLeft = new Point(chartX, chartY);
    const bottomRight = new Point(chartX + chartWidth, chartY + chartHeight);

    const now = new Date();
    const startTime = new Date(now.getTime() - HOUR_MS);
    const lineTimeWithX: [Date,number][] = [1,2,3,4,5,6].map(i => {
        const time = new Date((startTime.getTime() - (startTime.getTime() % MIN_MS)) + i * MIN_MS);
        return [time, timeX(chartWidth, chartX, startTime, time)];
    });

    const priceCenterY = chartHeight / 2 + chartY;
    const priceCenter = orderBooks.length > 0 ? orderBooks[0].getMid() : 0;

    const priceWidth = orderBooks.reduce((acc,cur) => Math.max(acc, Math.abs(cur.getMid() - priceCenter)), 0) * 2;
    
    const linePriceWithY: [number, number][] = priceWidth > 0 ? [-10, -5, 5, 10].map(p => {
        const price = priceCenter + priceWidth * p / 10;
        return [price, priceY(chartHeight, priceCenterY, priceWidth, priceCenter, price)];
    }) : [];

    return (
        <div>
            <div>BTC Chart</div>
            <div ref={squareRef} style={{height: "500px"}}>
                <svg x={0} y={0} width={svgWidth} height={svgHeight} style={{backgroundColor: "#000"}}>
                    {circleRend(upperLeft, bottomRight)}

                    {lineTimeWithX.map(([_,x]) => <line key={x} x1={x} y1={upperLeft.y} x2={x} y2={bottomRight.y} strokeWidth={1} stroke="#fff" />)}
                    {lineTimeWithX.map(([time,x]) => <text key={x} x={Math.min(bottomRight.x - 52, Math.max(0, x - 26))} y={bottomRight.y + 20} fontFamily="Verdana" fontSize={20} fill='#fff'>{timeString(time)}</text>)}

                    <line x1={upperLeft.x} y1={priceCenterY} x2={bottomRight.x} y2={priceCenterY} strokeWidth={1} stroke="#fff" />
                    <text x={bottomRight.x} y={priceCenterY+5} fontFamily="Verdana" fontSize={15} fill='#fff'>{priceCenter}</text>

                    {linePriceWithY.map(([_,y]) => <line key={y} x1={upperLeft.x} y1={y} x2={bottomRight.x} y2={y} strokeWidth={1} stroke="#fff" ></line>)}
                    {linePriceWithY.map(([price,y]) => <text key={y} x={bottomRight.x} y={Math.max(15, y+5)} fontFamily="Verdana" fontSize={15} fill='#fff'>{price}</text>)}

                    {priceWidth > 0 ? Array.from(Array(orderBooks.length - 1)).map((_,index) => <line key={orderBooks[index].responsetime.getTime()} x1={timeX(chartWidth, chartX, startTime, orderBooks[index].responsetime)} y1={priceY(chartHeight, priceCenterY, priceWidth, priceCenter, orderBooks[index].getMid())} x2={timeX(chartWidth, chartX, startTime, orderBooks[index+1].responsetime)} y2={priceY(chartHeight, priceCenterY, priceWidth, priceCenter, orderBooks[index+1].getMid())} strokeWidth={1} stroke="#0f0" />): <></>}
                </svg>
            </div>
        </div>
    );
}
