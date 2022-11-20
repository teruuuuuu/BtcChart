
import {useSelector} from 'react-redux';

import {RootState} from '../store/Store';
import { useElementSize } from 'usehooks-ts'

import { PriceInfo } from '../type/PriceInfo';

const TEN_MIN_MS = 600000;
const HOUR_MS = 3600000;

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function timeX(chartWidth: number, chartX: number, startTime: Date, endTime: Date, time: Date) {
    return ((time.getTime() - startTime.getTime()) / (endTime.getTime() - startTime.getTime())) * chartWidth + chartX;
}

function priceY(chartHeight: number, chartY: number, priceTop: number, priceBottom: number, price: number) {
    return (1 - (price - priceBottom) / (priceTop - priceBottom)) * chartHeight + chartY;
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

export const ChartView = () => {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - HOUR_MS);

    const orderBooks = useSelector((state:RootState) => state.orderbook.history.filter(price => price.date.getTime() >= startTime.getTime() && price.date.getTime() <= endTime.getTime()));
    const timeProts: Date[] = [1,2,3,4,5,6].map(i => new Date((startTime.getTime() - (startTime.getTime() % TEN_MIN_MS)) + i * TEN_MIN_MS));

    const priceCenter = orderBooks.length > 0 ? orderBooks[0].mid : 0;
    const priceWidth = orderBooks.reduce((acc,cur) => Math.max(acc, Math.abs(cur.mid - priceCenter)), 0) * 1.2;
    const priceTop = priceCenter + priceWidth;
    const priceBottom = priceCenter - priceWidth;
    const priceProtos = priceCenter == 0 ? [] : Array.from(Array(9)).map((_, i) => priceBottom + i * (priceTop - priceBottom)/8);

    return Chart({startTime, endTime, timeProts, orderBooks, priceTop, priceBottom, priceProtos});
}

interface Props {
    startTime: Date;
    endTime: Date;
    timeProts: Date[];
    orderBooks: PriceInfo[];
    priceTop: number;
    priceBottom: number;
    priceProtos: number[];
}

const Chart = (props:Props) => {
    const {startTime, endTime, timeProts, orderBooks, priceTop, priceBottom, priceProtos} = props;

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

    const lineTimeWithX: [Date,number][] = timeProts.map(time => [time, timeX(chartWidth, chartX, startTime, endTime, time)]);
    const linePriceWithY: [number, number][] = priceProtos.map(price => [price, priceY(chartHeight, chartY, priceTop, priceBottom, price)]);

    return (
        <div>
            <div>{orderBooks.length > 0 ? orderBooks[0].symbol : ""} Chart</div>
            <div ref={squareRef} style={{height: "500px"}}>
                <svg x={0} y={0} width={svgWidth} height={svgHeight} style={{backgroundColor: "#000"}}>
                    {circleRend(upperLeft, bottomRight)}

                    {lineTimeWithX.map(([_,x], index) => <line key={index} x1={x} y1={upperLeft.y} x2={x} y2={bottomRight.y} strokeWidth={1} stroke="#fff" />)}
                    {lineTimeWithX.map(([time,x], index) => <text key={index} x={Math.min(bottomRight.x - 52, Math.max(0, x - 26))} y={bottomRight.y + 20} fontFamily="Verdana" fontSize={20} fill='#fff'>{timeString(time)}</text>)}

                    {linePriceWithY.map(([_,y], index) => <line key={index} x1={upperLeft.x} y1={y} x2={bottomRight.x} y2={y} strokeWidth={1} stroke="#fff" ></line>)}
                    {linePriceWithY.map(([price,y], index) => <text key={index} x={bottomRight.x} y={Math.max(15, y+5)} fontFamily="Verdana" fontSize={15} fill='#fff'>{price}</text>)}

                    {priceTop > 0 ? Array.from(Array(orderBooks.length - 1)).map((_,index) => 
                        <line key={index} x1={timeX(chartWidth, chartX, startTime, endTime, orderBooks[index].date)} y1={priceY(chartHeight, chartY, priceTop, priceBottom, orderBooks[index].mid)} x2={timeX(chartWidth, chartX, startTime, endTime, orderBooks[index+1].date)} y2={priceY(chartHeight, chartY, priceTop, priceBottom, orderBooks[index+1].mid)} strokeWidth={1} stroke="#0f0" /> ): <></>}
                </svg>
            </div>
        </div>
    );
}
