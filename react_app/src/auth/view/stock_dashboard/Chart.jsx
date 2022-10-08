import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { returnStockDashboardChartData } from '../../domain/mainDashboardFunctions'

import { useState, useEffect } from 'react'
const Chart =({id})=>{
    const [chartData, setChartData] = useState({id})
    useEffect(() => {
        async function run(){
            const newData = await returnStockDashboardChartData(id)
            setChartData(newData)
        }
        run()
      }, []);

    return(
        <div>
            
  <LineChart width={600} height={300} data={chartData}>
    <Line type="monotone" dataKey="close" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="date" />
    <YAxis />
  </LineChart>

        </div>
    )

}

export default Chart