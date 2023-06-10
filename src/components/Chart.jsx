import React from 'react'
import {Line} from 'react-chartjs-2'
import {
  Chart as ChartJS,  Tooltip, Legend, PointElement, LineElement, LinearScale, CategoryScale,
} from 'chart.js'
ChartJS.register(
  Tooltip, Legend, PointElement, LineElement, LinearScale, CategoryScale,
)

const Chart = ({arr=[], currency, days}) => {
//  console.log(arr)
  let prices = []
  let date = []
  arr.forEach(element => {
    if(days === '24h'){
      date = date.concat(new Date(element[0]).toLocaleTimeString())
    }else{
      date = date.concat(new Date(element[0]).toLocaleDateString())
    }
    prices = prices.concat(element[1])
  });

  const data = {labels: date,
    datasets: [{
        label: `Price in ${currency}`,
        data: prices, 
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(255,99,132, 0.5)',
    }]}
  return (
    <Line
     options={{responsive: true}}
      data={data}
    />
  )
}

export default Chart