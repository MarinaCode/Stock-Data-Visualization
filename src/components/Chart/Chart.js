import React from 'react';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import './chart.css';

function Chart({ stock }) {
  const option = {
    title: null,
    chart: {
      zoomType: 'x',
    },
    legend: false,
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 4
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 4
          }
        },
        threshold: null
      }
    },
    yAxis: {
      title: {
        enabled: false
      }
    },

    xAxis: {
      type: "datetime",
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%b/%e/%Y', this.value);
        }
      }
    },
    tooltip: {
      pointFormatter: function() {
        return `${stock.symbol}: ${this.y}`;
      }
    },
    series: [{
      name: stock.symbol,
      type: 'area',
      color: '#4f6a82',
      data: stock.series
    }]
  }
  return (
    <div className="wrapper">
      <div className="company">
        <label className="companyTitle">{stock.symbol}</label>
        <div>
          <span className="meta"> {stock.regularMarketPrice} {stock.currency}</span>
          <span className="meta"> Prev Close: {stock.chartPreviousClose} </span>
          <span className="meta"> Volume: {stock.volume} </span>
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={option}
      />
    </div>
  )
}

export default Chart;
