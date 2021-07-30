import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import CustomTooltip from 'components/customTooltip/customTooltip';

const CryptoChart = ({crypto}) => {
  const [price, setPrice] = useState([]);

  useEffect(() => {
    let coin;
    if(crypto === 'BTC') coin = 'bitcoin';
    if(crypto === 'CHZ') coin = 'chiliz';
    if(crypto === 'FIL') coin = 'filecoin';
    if(crypto === 'ADA') coin = 'cardano';
    if(crypto === 'ETH') coin = 'ethereum';
    if(crypto === 'BNB') coin = 'binancecoin';
    if(crypto === 'DOT') coin = 'polkadot';
    if(crypto === 'AXS') coin = 'axie-infinity'
    axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`)
      .then((res) => {
        const data = []
        res.data.prices.forEach(e => {
          let fecha = `${new Date(e[0]).getFullYear()}/${new Date(e[0]).getMonth() + 1}/${new Date(e[0]).getDate()}`;
          console.log(fecha);
          data.push({
            precio: e[1],
            date: fecha,
          })
        });
        // console.log(data[0].date);
        setPrice(data);
      })
  },[crypto]);
  return (
    <ResponsiveContainer width="100%" height={75}>
      <AreaChart data={price}> 
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451b7" stopOpacity={0.4}/>
            <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <Area dataKey="precio" stroke="#2451b7" fill="url(#color)"/>
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <CartesianGrid opacity={0.1} vertical={false}/>
      </AreaChart>
    </ResponsiveContainer>
  )
};

export default CryptoChart;