import './App.css';

import React, {useCallback, useEffect, useState} from 'react';

import collectData from './utils/helpers';
import parallel from './utils/parallel';
import fetcher from './utils/fetch';

import Chart from './components/Chart/Chart';

function App() {
  const [stockState, setStockState] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let fetchStockData = useCallback(async () => {
    let data = collectData();
    return await parallel(data.map(async el => await fetcher(el.url, el.options)));
  }, []);

  const constructData = (records) => {
    let allData = [];
    records.forEach(record => {
      let series = [];
      const result = record.chart.result[0] || [];
      const timestamps = result.timestamp;
      const values = result.indicators.adjclose[0].adjclose;
      const volumes = result.indicators.quote[0].volume;
      const res = result['meta'];

      timestamps.forEach((timestamp, index) => {
        series.push([timestamp * 1000, values[index]]);
      });

      allData.push({
        regularMarketPrice: res.regularMarketPrice,
        chartPreviousClose: parseFloat(values[values.length - 2]).toFixed(2),
        symbol: res?.symbol || [],
        currency: res.currency,
        series: series,
        volume: volumes[volumes.length - 1]
      });
    });
    setStockState(allData);
  };

  useEffect(() => {
    (async () => {
      try {
        let data = await fetchStockData();
        constructData(data);
        setLoading(false);
      } catch (err) {
        console.info("Something went wrong");
      }
    })()
  }, [fetchStockData]);

  return (
    <div className="app">
      <h1 className="title">Stock Data Visualization </h1>
      { isLoading && <div className="loading">Loading ... </div> }
      { !isLoading &&
        <div className="container">
          {
            stockState.map((stock, i) => <Chart stock={stock} key={i}/>)
          }
        </div>
      }
    </div>
  )
}

export default App;
