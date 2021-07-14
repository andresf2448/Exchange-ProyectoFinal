import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import CustomTooltip from 'components/customTooltip/customTooltip';
import useStyles from 'styles';

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 200, pv: 2300, amt: 2300}];

const CryptoChart = ({crypto}) => {
  const classes = useStyles();
  // console.log(crypto);
  
  const [price, setPrice] = useState([]);

  useEffect(() => {
    let coin;
    if(crypto === 'BTC') coin = 'bitcoin';
    axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`)
      .then((res) => {
        const data = []
        res.data.prices.forEach(e => {
          data.push({
            precio: e[1],
            date: new Date(e[0]).toLocaleDateString()
          })
        });
        setPrice(data);
        // console.log(res.data);
      })
  },[]);
  // console.log(price);
  return (
    <ResponsiveContainer width="100%" height={300}>
      {/* <LineChart width={300} height={150} data={price} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="precio" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart> */}
      <AreaChart data={price}> 
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451b7" stopOpacity={0.4}/>
            <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <Area dataKey="precio" stroke="#2451b7" fill="url(#color)"/>
        <XAxis 
          dataKey="date"
          axisLine={false} 
          tickLine={false} 
        />
        <YAxis 
          dataKey="precio" 
          axisLine={false} 
          tickLine={false} 
          tickCount={10} 
          tickFormatter={(number => `$${number}`)}
          />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false}/>
      </AreaChart>
    </ResponsiveContainer>
  )
};

export default CryptoChart;